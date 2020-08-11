package AcquisitionTypes

import "github.com/graphql-go/graphql"

var FactureType = graphql.NewObject(graphql.ObjectConfig{
	Name: "FactureType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"numFacture": &graphql.Field{
			Type: graphql.String,
		},
		"provider": &graphql.Field{
			Type: graphql.String,
		},
		"order": &graphql.Field{
			Type: graphql.ID,
		},
		"status": &graphql.Field{
			Type: graphql.String,
		},
		"date": &graphql.Field{
			Type: graphql.String,
		},
		"payementDate": &graphql.Field{
			Type: graphql.String,
		},
		"total_ttc": &graphql.Field{
			Type: graphql.Float,
		},
		"currency": &graphql.Field{
			Type: graphql.String,
		},
		"establishement": &graphql.Field{
			Type: graphql.String,
		},

		"quantitiesFactured": &graphql.Field{
			Type: graphql.NewList(graphql.Float),
		},
		"order_lines": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
	},
})
