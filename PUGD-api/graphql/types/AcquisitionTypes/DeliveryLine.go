package AcquisitionTypes

import "github.com/graphql-go/graphql"

var DeliveryLineType = graphql.NewObject(graphql.ObjectConfig{
	Name: "DeliveryLineType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"orderline": &graphql.Field{
			Type: graphql.ID,
		},
		"order": &graphql.Field{
			Type: graphql.ID,
		},
		"isbn": &graphql.Field{
			Type: graphql.String,
		},
		"date": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"newquantity": &graphql.Field{
			Type: graphql.Int,
		},
		"remainingquantity": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
