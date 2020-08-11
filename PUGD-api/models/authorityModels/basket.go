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

type Basket struct {
	Id             primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Basket_Name     string               `json:"basket_name"`
	Basket_Note     string               `json:"basket_note"`
	Basket_Type     string               `json:"basket_type"`
	Basket_Color    string               `json:"basket_color"`
	Basket_Elements []primitive.ObjectID `json:"basket_elements"`
}

func (b *Basket) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("basket")
	result, errStoring := coll.InsertOne(ctx, b)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (b *Basket) Update(BasketUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("basket")

	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": b.Id},

		bson.M{
			"$set": BasketUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}
func (a *Basket) FindMultiple(filter map[string]interface{}) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("basket")

	cursor, err := coll.Find(ctx, filter)
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
