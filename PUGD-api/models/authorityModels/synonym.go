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

type Synonym struct {
	Id       primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Word     string               `json:"word"`
	Leads_To []primitive.ObjectID `json:"leads_to"`
}

func (s *Synonym) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("synonym")
	result, errStoring := coll.InsertOne(ctx, s)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (s *Synonym) Update(SynonymUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("synonym")

	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": s.Id},

		bson.M{
			"$set": SynonymUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}
func (s *Synonym) FindMultiple(filter bson.M) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("synonym")
	lookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "synonym"},
			{"localField", "leads_to"},
			{"foreignField", "_id"},
			{"as", "leads_to"}},
	}}
	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{lookupStage,bson.D{
		{"$match", filter},
	}})
	//showLoadedCursor, err := episodesCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage})
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
