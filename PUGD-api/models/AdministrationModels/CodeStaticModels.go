package AdministrationModels

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type CodeStatic struct {
	ID   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name string             `json:"static_name" bson:"static_name"`
}

func (this CodeStatic) ToString() string {
	result := fmt.Sprintf("\nStatus id: %s", this.ID.Hex())
	result = result + fmt.Sprintf("\nstatus_name: %s", this.Name)
	return result
}

func (this *CodeStatic) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.CodeStatic))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}

func (this CodeStatic) Find() *CodeStatic {
	filter := bson.M{
		"static_name": this.Name,
	}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var status CodeStatic
	err := models.DB.Collection(os.Getenv(db.CodeStatic)).FindOne(ctx, filter).Decode(&status)
	if err != nil {
		return nil
	}

	log.Print("Find----------\n ", status.ToString())
	return &status
}
func (this *CodeStatic) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.CodeStatic))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.ID},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}

func (this *CodeStatic) FindAllOrBy(filter bson.M) ([]*CodeStatic, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.CodeStatic))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, nil
		}
	}
	var results []*CodeStatic
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Status -> FindAllOrBy \n Error ==>:", err)
	}
	log.Println("Length of Table Status: ", len(results))
	return results, nil
}
func (*CodeStatic) FindStatusByID(id primitive.ObjectID) (*CodeStatic, error) {
	Status := &CodeStatic{}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	err := models.DB.Collection(os.Getenv(db.CodeStatic)).FindOne(ctx, bson.M{"_id": id}).Decode(Status)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}
	// log.Print(Status)
	return Status, nil
}
