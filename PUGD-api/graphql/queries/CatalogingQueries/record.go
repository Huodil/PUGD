package CatalogingQueries

import (
	"context"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/CatalogingTypes"
	"github.com/Harmony-Technology/PUGD-api/models"

	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

//Get record by _id
var GetOneRecord = &graphql.Field{
	Type: CatalogingTypes.RecordType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		record := &CatalogingModel.Record{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("records").FindOne(ctx, filter).Decode(record)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return record, nil
	},
}

//Get All Records
//params are optional

var GetAllRecords = &graphql.Field{
	Type: graphql.NewList(CatalogingTypes.RecordType),
	Args: graphql.FieldConfigArgument{
		"ISBN": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		isbn := p.Args["ISBN"]
		filter := bson.M{}
		if isbn != nil && isbn != "" && isbn != "*" {
			filter["isbn"] = isbn
		}
		coll := models.DB.Collection("records")
		//  opts := options.Find().SetSort(bson.D{{"age", 1}})
		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}
		var results []*CatalogingModel.Record
		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil
	},
}
