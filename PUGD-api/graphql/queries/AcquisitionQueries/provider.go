package AcquisitionQueries

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/AcquisitionTypes"
	"github.com/Harmony-Technology/PUGD-api/models/AcquisitionModels"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

//Get provider by _id
var GetOneProvider = &graphql.Field{
	Type: AcquisitionTypes.ProviderType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		provider := &AcquisitionModels.Provider{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("providers").FindOne(ctx, filter).Decode(provider)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return provider, nil
	},
}

//Get All providers
//params are optional

var GetAllProviders = &graphql.Field{
	Type: graphql.NewList(AcquisitionTypes.ProviderType),
	Args: graphql.FieldConfigArgument{

		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		name := p.Args["name"]

		filter := bson.M{}

		if name != nil {
			filter["name"] = name
		}

		coll := models.DB.Collection("providers")

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*AcquisitionModels.Provider

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
