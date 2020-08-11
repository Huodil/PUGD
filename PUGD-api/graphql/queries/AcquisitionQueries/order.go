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

//Get order by _id
var GetOrder = &graphql.Field{
	Type: AcquisitionTypes.OrderType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		order := &AcquisitionModels.Order{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("order").FindOne(ctx, filter).Decode(order)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return order, nil
	},
}

//Get orders || Get orders knowing {establishement;status;type;provider}

var GetOrders = &graphql.Field{
	Type: graphql.NewList(AcquisitionTypes.OrderType),
	Args: graphql.FieldConfigArgument{

		"establishement": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"provider": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"received": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"factured": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		establishement := p.Args["establishement"]
		status := p.Args["status"]
		type1 := p.Args["type"]
		provider := p.Args["provider"]

		filter := bson.M{}

		if establishement != nil {
			filter["establishement"] = establishement
		}
		if status != nil {
			filter["status"] = status
		}
		if type1 != nil {
			filter["type"] = type1
		}
		if provider != nil {
			filter["provider"] = provider
		}

		coll := models.DB.Collection("order")

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*AcquisitionModels.Order

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
