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

//Insert new Order
var InsertFacture = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"numFacture": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"provider": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"order": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"date": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"payementDate": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"total_ttc": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"establishement": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"currency": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"quantitiesFactured": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.Float),
		},
		"order_lines": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("facture")
		facture := AcquisitionModels.Facture{}
		if p.Args["id"] != nil {
			// hexst := fmt.Sprintf("%x", p.Args["id"].(string))
			if id, err := primitive.ObjectIDFromHex(p.Args["id"].(string)); err == nil {
				facture.ID = id
			} else {
				return nil, ErrInvalidHex
			}
		}
		//convert order from string to object id
		if p.Args["order"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["order"].(string)); err == nil {
				facture.Order = id
			} else {
				return nil, err
			}
		}
		if NumFacture := p.Args["numFacture"]; NumFacture != nil {
			facture.NumFacture = NumFacture.(string)
		}
		if Provider := p.Args["provider"]; Provider != nil {
			facture.Provider = Provider.(string)
		}
		if Status := p.Args["status"]; Status != nil {
			facture.Status = Status.(string)
		}
		if date := p.Args["date"]; date != nil {
			facture.Date = date.(string)
		}
		if payementDate := p.Args["payementDate"]; payementDate != nil {
			facture.PayementDate = payementDate.(string)
		}
		if total_ttc := p.Args["total_ttc"]; total_ttc != nil {
			facture.Total_ttc = total_ttc.(float64)
		}
		if establishement := p.Args["establishement"]; establishement != nil {
			facture.Establishement = establishement.(string)
		}

		if quantitiesFactured := p.Args["quantitiesFactured"]; quantitiesFactured != nil {
			q_List := quantitiesFactured.([]interface{})
			new_bound := []float64{}
			for _, v := range q_List {
				new_bound = append(new_bound, v.(float64))
			}
			facture.QuantitiesFactured = new_bound
		}
		if currency := p.Args["currency"]; currency != nil {
			facture.Currency = currency.(string)
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
			facture.Order_lines = ObjectIdList

		}
		result, err2 := coll.InsertOne(ctx, facture)
		if err2 != nil {
			log.Fatal(err2)
		}

		return result, nil

	},
}

//Delete Facture
var DeleteFacture = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("facture")

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
