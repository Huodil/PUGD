package CatalogingTypes

import "github.com/graphql-go/graphql"

var FunctionType = graphql.NewObject(graphql.ObjectConfig{
	Name: "FunctionType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.String,
		},
		"value": &graphql.Field{
			Type: graphql.String,
		},
		"number": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
