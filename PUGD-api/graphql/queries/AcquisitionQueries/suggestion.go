package AcquisitionQueries

import (
	"context"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/AcquisitionTypes"
	"github.com/Harmony-Technology/PUGD-api/models/AcquisitionModels"

	models "github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

//Get Suggestion by id
var GetSuggestion = &graphql.Field{
	Type: AcquisitionTypes.Suggestion,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		suggestion := &AcquisitionModels.Suggestion{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("suggestion").FindOne(ctx, filter).Decode(suggestion)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return suggestion, nil
	},
}

//Get Suggestions || Get Suggestions knowing {source , isbn , datepublication}
var GetSuggestions = &graphql.Field{
	Type: graphql.NewList(AcquisitionTypes.Suggestion),
	Args: graphql.FieldConfigArgument{
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"source": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"datepublication": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"flag": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		isbn := p.Args["isbn"]
		source := p.Args["source"]
		datepublication := p.Args["datepublication"]
		flag := p.Args["flag"]

		filter := bson.M{}

		if isbn != nil {
			filter["isbn"] = isbn
		}
		if source != nil {
			filter["source"] = source
		}

		if datepublication != nil {
			filter["datepublication"] = datepublication
		}
		if flag != nil {
			filter["flag"] = flag
		}

		coll := models.DB.Collection("suggestion")

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*AcquisitionModels.Suggestion

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
