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
var GetOneFunction = &graphql.Field{
	Type: CatalogingTypes.FunctionType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		l := &CatalogingModel.Function{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("functions").FindOne(ctx, filter).Decode(l)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return l, nil
	},
}

//Get All Records
//params are optional

var GetAllFunctions = &graphql.Field{
	Type: graphql.NewList(CatalogingTypes.FunctionType),
	Args: graphql.FieldConfigArgument{

		"Value": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		n := p.Args["Value"]

		filter := bson.M{}

		if n != nil && n != "" && n != "*" {
			filter["value"] = n
		}

		coll := models.DB.Collection("functions")

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*CatalogingModel.Function

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
