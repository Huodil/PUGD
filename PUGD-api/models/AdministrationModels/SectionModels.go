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

type Section struct {
	ID                primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name              string             `json:"section_name" bson:"section_name"`
	Image             string             `json:"image" bson:"image"`
	VisibleInOPAC     bool               `json:"visible_in_opac" bson:"visible_in_opac"`
	VisibleInLocation bool               `json:"visible_in_location" bson:"visible_in_location"`
	InternationalCode string             `json:"international_code" bson:"international_code"`
	OwenId            primitive.ObjectID `json:"owen" bson:"owen"`
}

func (this *Section) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Section))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}

func (this *Section) Find() *Section {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var section Section
	filter := bson.M{
		"section_name":       this.Name,
		"international_code": this.InternationalCode,
	}
	err := models.DB.Collection(os.Getenv(db.Section)).FindOne(ctx, filter).Decode(&section)
	if err != nil {
		return nil
	}

	return &section
}

func (this *Section) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Section))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.ID},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}

func (this *Section) FindAllOrBy(filter bson.M) ([]*Section, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Section))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, nil
		}
	}
	var results []*Section
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Status -> FindAllOrBy \n Error ==>:", err)
	}
	log.Println("Length of Table Status: ", len(results))
	return results, nil
}
func (*Section) FindOne(id primitive.ObjectID) (*Section, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	Section := &Section{}
	err := models.DB.Collection(os.Getenv(db.Section)).FindOne(ctx, bson.M{"_id": id}).Decode(Section)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}
	return Section, nil
}
