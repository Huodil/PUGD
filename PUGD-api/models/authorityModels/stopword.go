package authorityModels

import (
	"context"
	"errors"
	"github.com/Harmony-Technology/PUGD-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"time"
)

type Stopword struct {
	Id   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Word string             `json:"word"`
	Type int                `json:"type"`
}

func (s *Stopword) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("stopword")
	result, errStoring := coll.InsertOne(ctx, s)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (s *Stopword) Update(StopwordUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("stopword")
	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": s.Id},

		bson.M{
			"$set": StopwordUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}
func (s *Stopword) FindMultiple(filter bson.M) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("stopword")
	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{bson.D{
		{"$match", filter},
	}})
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
