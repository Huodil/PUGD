package authorityModels

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Category struct {
	Id                 primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Record             []primitive.ObjectID `json:"record"`
	Serial             []primitive.ObjectID `json:"serial"`
	Name               string               `json:"name"`
	Scope_note         string               `json:"scope_note"`
	Comment            string               `json:"comment"`
	Broader_term       primitive.ObjectID   `json:"broader_term"`
	See                primitive.ObjectID   `json:"see"`
	See_also           []primitive.ObjectID `json:"see_also"`
	Authority_number   int                  `json:"authority_number"`
	URL_thumbnail      string               `json:"url_thumbnail"`
	Linked_authorities []primitive.ObjectID `json:"linked_authorities"`
}

func (c *Category) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("category")
	result, errStoring := coll.InsertOne(ctx, c)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (c *Category) Update(CategoryUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("category")

	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": c.Id},
		bson.M{
			"$set": CategoryUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}
func (c *Category) FindMultiple(filter bson.M) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("category")
	LinkedAuthorityLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "authority_link"},
			{"localField", "linked_authorities"},
			{"foreignField", "_id"},
			{"as", "linked_authorities"}},
	}}
	BroaderTermLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "category"},
			{"localField", "broader_term"},
			{"foreignField", "_id"},
			{"as", "broader_term"}},
	}}
	UnwindBroaderTermLookupStage := bson.D{{"$unwind", bson.D{{"path", "$broader_term"}, {"preserveNullAndEmptyArrays", true}}}}

	SeeLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "category"},
			{"localField", "see"},
			{"foreignField", "_id"},
			{"as", "see"}},
	}}
	UnwindSeeLookupStage := bson.D{{"$unwind", bson.D{{"path", "$see"}, {"preserveNullAndEmptyArrays", true}}}}

	SeeAlsoLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "category"},
			{"localField", "see_also"},
			{"foreignField", "_id"},
			{"as", "see_also"}},
	}}
	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{
		bson.D{
			{"$match", filter},
		},
		LinkedAuthorityLookupStage,
		BroaderTermLookupStage,
		UnwindBroaderTermLookupStage,
		SeeLookupStage,
		UnwindSeeLookupStage,
		SeeAlsoLookupStage,
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

	fmt.Println("sfsdf")
	fmt.Println(results)
	return results, nil
}
