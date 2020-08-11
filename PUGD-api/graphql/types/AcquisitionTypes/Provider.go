package AcquisitionTypes

import "github.com/graphql-go/graphql"

var ProviderType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ProviderType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"establishement": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"account": &graphql.Field{
			Type: graphql.String,
		},
		"adress": &graphql.Field{
			Type: graphql.String,
		},
		"phone": &graphql.Field{
			Type: graphql.String,
		},
		"email": &graphql.Field{
			Type: graphql.String,
		},
		"website": &graphql.Field{
			Type: graphql.String,
		},
	},
})
