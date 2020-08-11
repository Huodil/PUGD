package AcquisitionMutations

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models/AcquisitionModels"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Insert new Order_Line
var InsertOrderLine = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
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

		"author": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"quantity": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"quantityreceived": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"quantityfactured": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"price": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},

		"discount": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("orderLine")
		//creation of the model
		orderline := AcquisitionModels.Order_Line{}

		if p.Args["_id"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string)); err == nil {
				orderline.ID = id
			} else {
				return nil, err
			}
		}

		if p.Args["id"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["id"].(string)); err == nil {
				orderline.ID = id
			} else {
				return nil, ErrInvalidHex
			}
		}
		//convert order from string to object id
		if p.Args["order"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["order"].(string)); err == nil {
				orderline.Order = id
			} else {
				return nil, err
			}
		}

		if isbn := p.Args["isbn"]; isbn != nil {
			orderline.Isbn = isbn.(string)
		}
		if title := p.Args["title"]; title != nil {
			orderline.Title = title.(string)
		}
		if author := p.Args["author"]; author != nil {
			orderline.Author = author.(string)
		}
		if quantity := p.Args["quantity"]; quantity != nil {
			orderline.Quantity = quantity.(int)
		}
		if quantityreceived := p.Args["quantityreceived"]; quantityreceived != nil {
			orderline.QuantityReceived = quantityreceived.(int)
		}
		if quantityfactured := p.Args["quantityfactured"]; quantityfactured != nil {
			orderline.QuantityFactured = quantityfactured.(int)
		}
		if price := p.Args["price"]; price != nil {
			orderline.Price = price.(float64)
		}
		if discount := p.Args["discount"]; discount != nil {
			orderline.Discount = discount.(float64)
		}
		if status := p.Args["status"]; status != nil {
			orderline.Status = status.(string)
		}
		//insert the model into the database
		result, err2 := coll.InsertOne(ctx, orderline)
		if err2 != nil {
			log.Fatal(err2)
		}
		//insert id

		return result, nil

	},
}

//Update Order_Line

var UpdateOrderLine = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
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

		"author": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"quantity": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"quantityreceived": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"quantityfactured": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"price": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},

		"discount": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("orderLine")
		//convert id from string to object id
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		isbn := p.Args["isbn"]
		title := p.Args["title"]
		author := p.Args["author"]
		quantity := p.Args["quantity"]
		quantityreceived := p.Args["quantityreceived"]
		quantityfactured := p.Args["quantityfactured"]
		price := p.Args["price"]
		discount := p.Args["discount"]
		status := p.Args["status"]

		OrderLineUpdate := bson.M{}

		//convert order from string to object id
		if p.Args["order"] != nil {
			if order, err := primitive.ObjectIDFromHex(p.Args["order"].(string)); err == nil {
				OrderLineUpdate["order"] = order
			} else {
				return nil, err
			}
		}
		if isbn != nil {
			OrderLineUpdate["isbn"] = isbn
		}
		if title != nil {
			OrderLineUpdate["title"] = title
		}
		if author != nil {
			OrderLineUpdate["author"] = author
		}
		if quantity != nil {
			OrderLineUpdate["quantity"] = quantity
		}
		if quantityreceived != nil {
			OrderLineUpdate["quantityreceived"] = quantityreceived
		}
		if quantityfactured != nil {
			OrderLineUpdate["quantityfactured"] = quantityfactured
		}
		if price != nil {
			OrderLineUpdate["price"] = price
		}
		if discount != nil {
			OrderLineUpdate["discount"] = discount
		}
		if status != nil {
			OrderLineUpdate["status"] = status
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": OrderLineUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}
		return result.ModifiedCount, nil

	},
}

//Delete OrderLine
var DeleteOrderLine = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("orderLine")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
