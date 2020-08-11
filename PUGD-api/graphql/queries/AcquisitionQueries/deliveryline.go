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

var GetDeliveryLine = &graphql.Field{
	Type: AcquisitionTypes.DeliveryLineType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		deliveryLine := &AcquisitionModels.Delivery_line{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("deliveryLine").FindOne(ctx, filter).Decode(deliveryLine)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return deliveryLine, nil
	},
}

var GetAllDeliveryLines = &graphql.Field{
	Type: graphql.NewList(AcquisitionTypes.DeliveryLineType),
	Args: graphql.FieldConfigArgument{

		"title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"order": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"orderline": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"date": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		title := p.Args["title"]
		isbn := p.Args["isbn"]
		date := p.Args["date"]

		filter := bson.M{}

		if title != nil {
			filter["title"] = title
		}
		if isbn != nil {
			filter["isbn"] = isbn
		}
		if date != nil {
			filter["date"] = date
		}
		if p.Args["orderline"] != nil {
			//convert string to object id
			if orderline, err := primitive.ObjectIDFromHex(p.Args["orderline"].(string)); err == nil {
				filter["orderline"] = orderline
			} else {
				return nil, err
			}
		}
		if p.Args["order"] != nil {
			//convert string to object id
			if orderline, err := primitive.ObjectIDFromHex(p.Args["order"].(string)); err == nil {
				filter["order"] = orderline
			} else {
				return nil, err
			}
		}

		coll := models.DB.Collection("deliveryLine")

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*AcquisitionModels.Delivery_line

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
