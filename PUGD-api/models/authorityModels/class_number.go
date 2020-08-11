package authorityModels

import (
	"context"
	"errors"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ClassNumber struct {
	Id                  primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Name                string               `json:"name"`
	Subject_description string               `json:"subject_description"`
	Url_thumbnail       string               `json:"url_thumbnail"`
	Linked_authorities  []primitive.ObjectID `json:"linked_authorities"`
	Record              []primitive.ObjectID `json:"record"`
	Serial              []primitive.ObjectID `json:"serial"`
}

func (cn *ClassNumber) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("class_number")
	result, errStoring := coll.InsertOne(ctx, cn)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (cn *ClassNumber) Update(ClassNumberUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("class_number")

	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": cn.Id},

		bson.M{
			"$set": ClassNumberUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}
func (cn *ClassNumber) FindMultiple(filter bson.M) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("class_number")
	LinkedAuthorityLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "authority_link"},
			{"localField", "linked_authorities"},
			{"foreignField", "_id"},
			{"as", "linked_authorities"}},
	}}

	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{
		bson.D{
			{"$match", filter},
		},
		LinkedAuthorityLookupStage,
	})
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal("fatal", err)
			return nil, nil
		}
	}
	var results []bson.M
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal(err)
	}
	return results, nil
}
