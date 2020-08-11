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

type Serial struct {
	Id                primitive.ObjectID       `json:"_id,omitempty" bson:"_id,omitempty"`
	ISSN              string                   `json:"issn"`
	Type              string                   `json:"type"`
	TitleProper       string                   `json:"titleProper"`
	OtherTitleInfo    string                   `json:"otherTitleInfo"`
	ParallelTitle     string                   `json:"parallel_title"`
	RecYear           int                      `json:"recYear"`
	Summary           string                   `json:"summary"`
	GenetalNote       string                   `json:"GenetalNote"`
	VisibleInSerial   bool                     `json:"VisibleInSerial"`
	ViewSerialCheckIn bool                     `json:"ViewSerialCheckIn"`
	NoteOnContents    string                   `json:"NoteOnContents"`
	Language          []primitive.ObjectID     `json:"Language"`
	OriginalLanguage  []primitive.ObjectID     `json:"Original_language"`
	KeyWords          []primitive.ObjectID     `json:"Key_words"`
	Category          []primitive.ObjectID     `json:"Category"`
	Branches          []primitive.ObjectID     `json:"Branches"`
	Publishers        primitive.ObjectID       `json:"Publishers"`
	OtherPublishers   primitive.ObjectID       `json:"otherPublishers"`
	Responsibility    []map[string]interface{} `json:"Responsibility"`
	ClassNumber       []primitive.ObjectID     `json:"ClassNumber"`
}

func AddSerial(serial Serial) primitive.ObjectID {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("serials")
	result, err2 := coll.InsertOne(ctx, serial)
	if err2 != nil {
		log.Fatal(err2)
	}
	return result.InsertedID.(primitive.ObjectID)
}
func FindSerialByID(id primitive.ObjectID) (*Serial, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	Serial := &Serial{}
	filter := bson.M{}
	filter["_id"] = id
	err := models.DB.Collection("serials").FindOne(ctx, filter).Decode(Serial)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}

	log.Print(Serial)
	return Serial, nil
}
