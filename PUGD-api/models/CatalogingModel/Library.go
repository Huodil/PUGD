package CatalogingModel

import (
	"context"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Library struct {
	Id      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name    string             `json:"name"`
	Address string             `json:"address"`
}

// find one Library by Id ,
func FindLibraryByID(id primitive.ObjectID) (*Library, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	Library := &Library{}
	filter := bson.M{}
	filter["_id"] = id
	err := models.DB.Collection("libraries").FindOne(ctx, filter).Decode(Library)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}

	log.Print(Library)
	return Library, nil
}
