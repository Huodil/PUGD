package AcquisitionTypes

import "github.com/graphql-go/graphql"

var OrderType = graphql.NewObject(graphql.ObjectConfig{
	Name: "OrderType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"type": &graphql.Field{
			Type: graphql.String,
		},
		"quotation_number": &graphql.Field{
			Type: graphql.String,
		},
		"order_number": &graphql.Field{
			Type: graphql.String,
		},
		"status": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"establishement": &graphql.Field{
			Type: graphql.String,
		},
		"provider": &graphql.Field{
			Type: graphql.String,
		},
		"financial_year": &graphql.Field{
			Type: graphql.String,
		},
		"date": &graphql.Field{
			Type: graphql.String,
		},
		"currency": &graphql.Field{
			Type: graphql.String,
		},
		"delivery_address": &graphql.Field{
			Type: graphql.String,
		},
		"billing_address": &graphql.Field{
			Type: graphql.String,
		},
		"notes": &graphql.Field{
			Type: graphql.String,
		},
		"order_lines": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
		"orders": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
		"received": &graphql.Field{
			Type: graphql.Boolean,
		},
		"factured": &graphql.Field{
			Type: graphql.Boolean,
		},
	},
})
