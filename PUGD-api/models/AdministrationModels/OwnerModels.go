package AdministrationModels

import (
	"context"
	"errors"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Owner struct {
	ID   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name string             `json:"owner_name" bson:"owner_name"`
}

func (this *Owner) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Owner))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}

func (this Owner) Find() *Owner {

	//todo Custom Filter
	filter := bson.M{
		"owner_name": this.Name,
	}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var owner Owner
	err := models.DB.Collection(os.Getenv(db.Owner)).FindOne(ctx, filter).Decode(&owner)
	if err != nil {
		return nil
	}

	return &owner
}
func (this *Owner) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Owner))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.ID},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}

func (this *Owner) FindAllOrBy(filter bson.M) ([]*Owner, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Owner))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, nil
		}
	}
	var results []*Owner
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Status -> FindAllOrBy \n Error ==>:", err)
	}
	log.Println("Length of Table Status: ", len(results))
	return results, nil
}
func (*Owner) FindOne(id primitive.ObjectID) (*Owner, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	Owner := &Owner{}
	err := models.DB.Collection(os.Getenv(db.Owner)).FindOne(ctx, bson.M{"_id": id}).Decode(Owner)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}
	return Owner, nil
}
