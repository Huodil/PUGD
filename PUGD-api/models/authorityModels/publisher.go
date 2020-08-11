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

type Publisher struct {
	Id                   primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Name                 string               `json:"name"`
	Address1             string               `json:"address1"`
	Address2             string               `json:"address2"`
	Post_code            string               `json:"post_code"`
	City                 string               `json:"city"`
	Country              string               `json:"country"`
	Website              string               `json:"website"`
	Supplier             primitive.ObjectID   `json:"supplier"`
	Note                 string               `json:"note"`
	Url_thumbnail        string               `json:"url_thumbnail"`
	Linked_authorities   []primitive.ObjectID `json:"linked_authorities"`
	Record               []primitive.ObjectID `json:"record"`
	Serial               []primitive.ObjectID `json:"serial"`
	RecordOtherPublisher []primitive.ObjectID `json:"recordOtherPublisher"`
	SerialOtherPublisher []primitive.ObjectID `json:"serialOtherPublisher"`
}

func (p *Publisher) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("publisher")
	result, errStoring := coll.InsertOne(ctx, p)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (p *Publisher) Update(PublisherUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("publisher")

	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": p.Id},

		bson.M{
			"$set": PublisherUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}
func (p *Publisher) FindMultiple(filter bson.M) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("publisher")

	LinkedAuthorityLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "authority_link"},
			{"localField", "linked_authorities"},
			{"foreignField", "_id"},
			{"as", "linked_authorities"}},
	}}
	SupplierLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "publisher"},
			{"localField", "supplier"},
			{"foreignField", "_id"},
			{"as", "supplier"}},
	}}
	UnwindSupplierLookupStage := bson.D{{"$unwind", bson.D{{"path", "$supplier"}, {"preserveNullAndEmptyArrays", true}}}}

	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{
		bson.D{
			{"$match", filter},
		},
		LinkedAuthorityLookupStage,
		SupplierLookupStage,
		UnwindSupplierLookupStage,
	})

	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal("fatal", err)
			return nil, nil
		}
		log.Fatal("fatal", err)
		return nil, nil
	}
	var results []bson.M
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal(err)
	}
	return results, nil
}
