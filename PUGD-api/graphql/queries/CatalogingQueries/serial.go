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
var GetOneSerial = &graphql.Field{
	Type: CatalogingTypes.SerialType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		serial := &CatalogingModel.Serial{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("serials").FindOne(ctx, filter).Decode(serial)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return serial, nil
	},
}

//Get All Records
//params are optional

var GetAllSerials = &graphql.Field{
	Type: graphql.NewList(CatalogingTypes.SerialType),
	Args: graphql.FieldConfigArgument{

		"ISSN": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		issn := p.Args["ISSN"]

		filter := bson.M{}

		if issn != nil && issn != "" && issn != "*" {
			filter["issn"] = issn
		}

		coll := models.DB.Collection("serials")

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*CatalogingModel.Serial

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
