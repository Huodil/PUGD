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

//Get orderline by _id
var GetOrderLine = &graphql.Field{
	Type: AcquisitionTypes.OrderLineType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		orderLine := &AcquisitionModels.Order_Line{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection("orderLine").FindOne(ctx, filter).Decode(orderLine)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return orderLine, nil
	},
}

//Get OrderLines || Get Orderlines knowing {title,isbn,author,order,status}
var GetAllOrderLines = &graphql.Field{
	Type: graphql.NewList(AcquisitionTypes.OrderLineType),
	Args: graphql.FieldConfigArgument{

		"title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"author": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"order": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		title := p.Args["title"]
		isbn := p.Args["isbn"]
		author := p.Args["author"]
		status := p.Args["status"]

		filter := bson.M{}

		if title != nil {
			filter["title"] = title
		}
		if isbn != nil {
			filter["isbn"] = isbn
		}
		if author != nil {
			filter["author"] = author
		}
		if p.Args["order"] != nil {
			//convert string to object id
			if order, err := primitive.ObjectIDFromHex(p.Args["order"].(string)); err == nil {
				filter["order"] = order
			} else {
				return nil, err
			}
		}
		if status != nil {
			filter["status"] = status
		}

		coll := models.DB.Collection("orderLine")

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*AcquisitionModels.Order_Line

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
