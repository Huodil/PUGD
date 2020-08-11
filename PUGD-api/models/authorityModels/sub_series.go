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

type SubSeries struct {
	Id                 primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Name               string               `json:"name"`
	Issn               string               `json:"issn"`
	Publisher          primitive.ObjectID   `json:"publisher"`
	Parent_series      primitive.ObjectID   `json:"parent_series"`
	Website            string               `json:"website"`
	Comment            string               `json:"comment"`
	Url_thumbnail      string               `json:"url_thumbnail"`
	Linked_authorities []primitive.ObjectID `json:"linked_authorities"`
	Record             []primitive.ObjectID `json:"record"`
}

func (s *SubSeries) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("sub_series")
	result, errStoring := coll.InsertOne(ctx, s)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (s *SubSeries) Update(SubSeriesUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("sub_series")

	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": s.Id},

		bson.M{
			"$set": SubSeriesUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}

func (s *SubSeries) FindMultiple(filter bson.M) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("sub_series")
	LinkedAuthorityLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "authority_link"},
			{"localField", "linked_authorities"},
			{"foreignField", "_id"},
			{"as", "linked_authorities"}},
	}}
	PublisherLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "publisher"},
			{"localField", "publisher"},
			{"foreignField", "_id"},
			{"as", "publisher"}},
	}}
	UnwindPublisherLookupStage := bson.D{{"$unwind", bson.D{{"path", "$publisher"}, {"preserveNullAndEmptyArrays", true}}}}
	ParentSeriesLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "series"},
			{"localField", "parent_series"},
			{"foreignField", "_id"},
			{"as", "parent_series"}},
	}}
	UnwindParentSeriesLookupStage := bson.D{{"$unwind", bson.D{{"path", "$parent_series"}, {"preserveNullAndEmptyArrays", true}}}}

	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{
		bson.D{
			{"$match", filter},
		},
		LinkedAuthorityLookupStage,
		PublisherLookupStage,
		UnwindPublisherLookupStage,
		ParentSeriesLookupStage,
		UnwindParentSeriesLookupStage,
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
