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

//Get facture by _id
var GetFacture = &graphql.Field{
	Type: AcquisitionTypes.FactureType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		facture := &AcquisitionModels.Facture{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("facture").FindOne(ctx, filter).Decode(facture)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return facture, nil
	},
}

//Get facture || Get facture knowing {status;provider}

var GetFactures = &graphql.Field{
	Type: graphql.NewList(AcquisitionTypes.FactureType),
	Args: graphql.FieldConfigArgument{
		"status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"provider": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		status := p.Args["status"]
		provider := p.Args["provider"]

		filter := bson.M{}

		if status != nil {
			filter["status"] = status
		}
		if provider != nil {
			filter["provider"] = provider
		}

		coll := models.DB.Collection("facture")

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*AcquisitionModels.Facture

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
