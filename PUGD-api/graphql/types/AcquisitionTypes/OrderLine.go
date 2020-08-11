package AcquisitionTypes

import "github.com/graphql-go/graphql"

var OrderLineType = graphql.NewObject(graphql.ObjectConfig{
	Name: "OrderLineType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"order": &graphql.Field{
			Type: graphql.ID,
		},
		"isbn": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"author": &graphql.Field{
			Type: graphql.String,
		},
		"quantity": &graphql.Field{
			Type: graphql.Int,
		},
		"quantityreceived": &graphql.Field{
			Type: graphql.Int,
		},
		"quantityfactured": &graphql.Field{
			Type: graphql.Int,
		},
		"price": &graphql.Field{
			Type: graphql.Float,
		},
		"discount": &graphql.Field{
			Type: graphql.Float,
		},
		"status": &graphql.Field{
			Type: graphql.String,
		},
	},
})
