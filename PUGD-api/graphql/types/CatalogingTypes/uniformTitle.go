package CatalogingTypes

import "github.com/graphql-go/graphql"

var UniformTitleType = graphql.NewObject(graphql.ObjectConfig{
	Name: "UniformTitleType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"Title": &graphql.Field{
			Type: graphql.String,
		},
		"Records": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
	},
})
