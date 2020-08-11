package AcquisitionMutations

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models/AcquisitionModels"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var ErrInvalidHex = errors.New("the provided hex string is not a valid ObjectID")

//Insert new Order
var InsertOrder = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"quotation_number": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"order_number": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"currency": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"establishement": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"provider": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"financial_year": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"date": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"delivery_address": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"billing_address": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"notes": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"order_lines": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"orders": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
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
		coll := models.DB.Collection("order")
		order := AcquisitionModels.Order{}
		orderB := bson.M{}
		if p.Args["id"] != nil {
			// hexst := fmt.Sprintf("%x", p.Args["id"].(string))
			if id, err := primitive.ObjectIDFromHex(p.Args["id"].(string)); err == nil {
				order.ID = id
				orderB["_id"] = id
			} else {
				return nil, ErrInvalidHex
			}
		}
		if type1 := p.Args["type"]; type1 != nil {
			order.Type = type1.(string)
			orderB["Type"] = type1.(string)
		}
		if name := p.Args["name"]; name != nil {
			order.Name = name.(string)
			orderB["Name"] = name.(string)

		}
		if status := p.Args["status"]; status != nil {
			order.Status = status.(string)
			orderB["Status"] = status.(string)

		}

		if quotation_number := p.Args["quotation_number"]; quotation_number != nil {
			order.Quotation_number = quotation_number.(string)
			orderB["Quotation_number"] = quotation_number.(string)

		}

		if order_number := p.Args["order_number"]; order_number != nil {
			order.Order_number = order_number.(string)
			orderB["Order_number"] = order_number.(string)

		}

		if establishement := p.Args["establishement"]; establishement != nil {
			order.Establishement = establishement.(string)
			orderB["Establishement"] = establishement.(string)

		}
		if provider := p.Args["provider"]; provider != nil {
			order.Provider = provider.(string)
		}
		if financial_year := p.Args["financial_year"]; financial_year != nil {
			order.Financial_year = financial_year.(string)

		}
		if date := p.Args["date"]; date != nil {
			order.Date = date.(string)

		}
		if currency := p.Args["currency"]; currency != nil {
			order.Currency = currency.(string)

		}
		if delivery_address := p.Args["delivery_address"]; delivery_address != nil {
			order.Delivery_address = delivery_address.(string)

		}
		if billing_address := p.Args["billing_address"]; billing_address != nil {
			order.Billing_address = billing_address.(string)

		}
		if notes := p.Args["notes"]; notes != nil {
			order.Notes = notes.(string)

		}
		if received := p.Args["received"]; received != nil {
			order.Received = received.(bool)

		}
		if factured := p.Args["factured"]; factured != nil {
			order.Factured = factured.(bool)

		}
		if order_lines := p.Args["order_lines"]; order_lines != nil {
			// convert the list to an interface array
			order_List := order_lines.([]interface{})
			// the resulting array
			var ObjectIdList = []primitive.ObjectID{}

			for i := 0; i < len(order_List); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(order_List[i].(string))
				if err != nil {
					return nil, ErrInvalidHex

				}
				ObjectIdList = append(ObjectIdList, _id)
			}
			order.Order_lines = ObjectIdList
			orderB["Order_lines"] = ObjectIdList

		}
		if orders := p.Args["orders"]; orders != nil {
			// convert the list to an interface array
			orders_List := orders.([]interface{})
			// the resulting array
			var ObjectIdList2 = []primitive.ObjectID{}

			for i := 0; i < len(orders_List); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(orders_List[i].(string))
				if err != nil {
					return nil, ErrInvalidHex

				}
				ObjectIdList2 = append(ObjectIdList2, _id)
			}
			order.Orders = ObjectIdList2
			orderB["Orders"] = ObjectIdList2

		}

		result, err2 := coll.InsertOne(ctx, order)
		if err2 != nil {
			log.Fatal(err2)
		}

		return result, nil

	},
}

//Update Order

var UpdateOrder = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"quotation_number": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"order_number": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"currency": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"establishement": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"provider": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"financial_year": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"date": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"delivery_address": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"billing_address": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"notes": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"order_lines": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"orders": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
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
		coll := models.DB.Collection("order")

		//convert input id from string to Object id
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		type1 := p.Args["type"]
		quotation_number := p.Args["quotation_number"]
		order_number := p.Args["order_number"]
		status := p.Args["status"]
		name := p.Args["name"]
		establishement := p.Args["establishement"]
		provider := p.Args["provider"]
		currency := p.Args["currency"]
		financial_year := p.Args["financial_year"]
		delivery_address := p.Args["delivery_address"]
		billing_address := p.Args["billing_address"]
		notes := p.Args["notes"]
		received := p.Args["received"]
		factured := p.Args["factured"]

		OrderUpdate := bson.M{}

		if type1 != nil {
			OrderUpdate["type"] = type1
		}
		if quotation_number != nil {
			OrderUpdate["quotation_number"] = quotation_number
		}
		if order_number != nil {
			OrderUpdate["order_number"] = order_number
		}
		if status != nil {
			OrderUpdate["status"] = status
		}
		if status != nil {
			OrderUpdate["currency"] = currency
		}
		if name != nil {
			OrderUpdate["name"] = name
		}
		if establishement != nil {
			OrderUpdate["establishement"] = establishement
		}
		if provider != nil {
			OrderUpdate["provider"] = provider
		}
		if financial_year != nil {
			OrderUpdate["financial_year"] = financial_year
		}
		if delivery_address != nil {
			OrderUpdate["delivery_address"] = delivery_address
		}
		if billing_address != nil {
			OrderUpdate["billing_address"] = billing_address
		}
		if notes != nil {
			OrderUpdate["notes"] = notes
		}
		if received != nil {
			OrderUpdate["received"] = received
		}
		if factured != nil {
			OrderUpdate["factured"] = factured
		}

		if order_lines := p.Args["order_lines"]; order_lines != nil {
			// convert the list to an interface array
			order_List := order_lines.([]interface{})
			// the resulting array
			var ObjectIdList = []primitive.ObjectID{}

			for i := 0; i < len(order_List); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(order_List[i].(string))
				if err != nil {
					return nil, err
				}
				ObjectIdList = append(ObjectIdList, _id)
			}
			OrderUpdate["order_lines"] = ObjectIdList
		}
		if orders := p.Args["orders"]; orders != nil {
			// convert the list to an interface array
			orders_List := orders.([]interface{})
			// the resulting array
			var ObjectIdList2 = []primitive.ObjectID{}

			for i := 0; i < len(orders_List); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(orders_List[i].(string))
				if err != nil {
					return nil, err
				}
				ObjectIdList2 = append(ObjectIdList2, _id)
			}
			OrderUpdate["orders"] = ObjectIdList2
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": OrderUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}
		return result.ModifiedCount, nil

	},
}

//Delete Order
var DeleteOrder = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("order")

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
