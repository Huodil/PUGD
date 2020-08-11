package AcquisitionMutations

import (
	"context"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models/AcquisitionModels"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Insert new Delivery_Line
var InsertDeliveryLine = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"orderline": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"order": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"date": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"newquantity": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"remainingquantity": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("deliveryLine")
		//creation of the model
		deliveryLine := AcquisitionModels.Delivery_line{}

		if p.Args["_id"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string)); err == nil {
				deliveryLine.ID = id
			} else {
				return nil, err
			}
		}

		//convert orderline from string to object id
		if p.Args["orderline"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["orderline"].(string)); err == nil {
				deliveryLine.Order_Line = id
			} else {
				return nil, err
			}
		}
		if p.Args["order"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["order"].(string)); err == nil {
				deliveryLine.Order = id
			} else {
				return nil, err
			}
		}
		if isbn := p.Args["isbn"]; isbn != nil {
			deliveryLine.Isbn = isbn.(string)
		}
		if title := p.Args["title"]; title != nil {
			deliveryLine.Title = title.(string)
		}
		if date := p.Args["date"]; date != nil {
			deliveryLine.Date = date.(string)
		}
		if newquantity := p.Args["newquantity"]; newquantity != nil {
			deliveryLine.NewQuantity = newquantity.(int)
		}
		if remainingquantity := p.Args["remainingquantity"]; remainingquantity != nil {
			deliveryLine.RemainingQuantity = remainingquantity.(int)
		}

		//insert the model into the database
		result, err2 := coll.InsertOne(ctx, deliveryLine)
		if err2 != nil {
			log.Fatal(err2)
		}
		//insert id

		return result, nil

	},
}
