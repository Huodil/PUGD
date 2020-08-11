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
var GetOneBranch = &graphql.Field{
	Type: CatalogingTypes.BranchType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		b := &CatalogingModel.Branch{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("branches").FindOne(ctx, filter).Decode(b)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return b, nil
	},
}

//Get All Records
//params are optional

var GetAllBranches = &graphql.Field{
	Type: graphql.NewList(CatalogingTypes.BranchType),
	Args: graphql.FieldConfigArgument{

		"BranchName": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		B := p.Args["BranchName"]

		filter := bson.M{}

		if B != nil && B != "" && B != "*" {
			filter["branchname"] = B
		}

		coll := models.DB.Collection("branches")

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*CatalogingModel.Branch

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
