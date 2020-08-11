package utils

import (
	"context"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// return a branch using a filter
func SearchBranch(id primitive.ObjectID) *CatalogingModel.Branch {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	branches := &CatalogingModel.Branch{}
	f := bson.M{}
	f["_id"] = id
	err := models.DB.Collection("branches").FindOne(ctx, f).Decode(branches)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil
		}
	}
	return branches
}

func SearchFunction(id primitive.ObjectID) (*primitive.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	functions := &primitive.M{}
	f := bson.M{}
	f["_id"] = id
	err := models.DB.Collection("functions").FindOne(ctx, f).Decode(functions)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, err
		}
	}
	return functions, nil
}

// return a Serial using a filter
func SearchSerial(id primitive.ObjectID) *CatalogingModel.Serial {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	serial := &CatalogingModel.Serial{}
	f := bson.M{}
	f["_id"] = id
	err2 := models.DB.Collection("serials").FindOne(ctx, f).Decode(serial)
	if err2 != nil {
		if err2 == mongo.ErrNoDocuments {
			log.Fatal(err2)
			return nil
		}
	}
	return serial
}

// return a Language using a filter
func SearchLanguage(id primitive.ObjectID) (*CatalogingModel.Language, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	language := &CatalogingModel.Language{}
	f := bson.M{}
	f["_id"] = id
	err2 := models.DB.Collection("languages").FindOne(ctx, f).Decode(language)
	if err2 != nil {
		if err2 == mongo.ErrNoDocuments {
			log.Fatal(err2)
			return nil, err2
		}
	}
	return language, nil
}

// return a KeyWord using a filter
func SearchKeyWord(id primitive.ObjectID) (*CatalogingModel.Keyword, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	KeyWord := &CatalogingModel.Keyword{}
	f := bson.M{}
	f["_id"] = id
	err2 := models.DB.Collection("keywords").FindOne(ctx, f).Decode(KeyWord)
	if err2 != nil {
		if err2 == mongo.ErrNoDocuments {
			log.Fatal(err2)
			return nil, err2
		}
	}
	return KeyWord, nil
}

// return a record using a filter
func SearchRecord(id primitive.ObjectID) *CatalogingModel.Record {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	Record := &CatalogingModel.Record{}
	f := bson.M{}
	f["_id"] = id
	err2 := models.DB.Collection("records").FindOne(ctx, f).Decode(Record)
	if err2 != nil {
		if err2 == mongo.ErrNoDocuments {
			log.Fatal(err2)
			return nil
		}
	}
	return Record
}
