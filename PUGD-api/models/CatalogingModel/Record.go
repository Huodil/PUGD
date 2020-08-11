package CatalogingModel

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// done Record = Notice
type Record struct {
	Id                primitive.ObjectID       `json:"_id,omitempty" bson:"_id,omitempty"`
	ISBN              string                   `json:"isbn"`
	Type              string                   `json:"type"`
	Title             string                   `json:"title"`
	OtherTitle        string                   `json:"otherTitle"`
	ParallelTitle     string                   `json:"parallel_title"`
	RecYear           int                      `json:"recYear"`
	Price             int                      `json:"price"`
	EditionStatement  string                   `json:"edditionStatment"`
	OtherInformations string                   `json:"OtherInformations"`
	Format            string                   `json:"format"`
	Summary           string                   `json:"summary"`
	NoteOnContents    string                   `json:"NoteOnContents"`
	ItemStatus        string                   `json:"ItemStatus"`
	IsNew             bool                     `json:"isNew"`
	IsNum             bool                     `json:"IsNum"`
	AccMaterial       string                   `json:"AccMaterial"`
	NoteAuthor        string                   `json:"NoteAuthor"`
	NbPages           int                      `json:"NbPages"`
	FkSeries          primitive.ObjectID       `json:"FK_Series"`
	FkSubSeries       primitive.ObjectID       `json:"FK_Sub_Series"`
	Baskets           []primitive.ObjectID     `json:"Baskets"`
	Language          []primitive.ObjectID     `json:"Language"`
	OriginalLanguage  []primitive.ObjectID     `json:"Original_language"`
	KeyWords          []primitive.ObjectID     `json:"Key_words"`
	Category          []primitive.ObjectID     `json:"Category"`
	Branches          []primitive.ObjectID     `json:"Branches"`
	Copies            []primitive.ObjectID     `json:"copies"`
	Publishers        primitive.ObjectID       `json:"Publishers"`
	OtherPublishers   primitive.ObjectID       `json:"otherPublishers"`
	CollectionTitle   []primitive.ObjectID     `json:"CollectionTitle"`
	ClassNumber       []primitive.ObjectID     `json:"ClassNumber"`
	Responsibility    []map[string]interface{} `json:"Responsibility"`
}

func AddRecord(record Record) primitive.ObjectID {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("records")
	result, err2 := coll.InsertOne(ctx, record)
	if err2 != nil {
		log.Fatal(err2)
	}
	if result != nil {
		return result.InsertedID.(primitive.ObjectID)
	} else {
		return primitive.NilObjectID
	}
}

// find one Record by Id ,
func FindRecordByID(id primitive.ObjectID) (*Record, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	record := &Record{}
	filter := bson.M{}
	filter["_id"] = id
	err := models.DB.Collection(os.Getenv(db.Records)).FindOne(ctx, filter).Decode(record)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}

	log.Print(record)
	return record, nil
}

func (*Record) FindBy(filter bson.D) ([]*Record, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Records))
	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{filter})
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal("fatal", err)
			return nil, err
		}
	}
	var results []*Record
	if err = cursor.All(ctx, &results); err != nil {
		//log.Fatal(err)
		log.Fatal("err =>", err)
	}
	log.Println("length : ", len(results))
	return results, nil
}
