package CatalogingTypes

import "github.com/graphql-go/graphql"

var LanguageType = graphql.NewObject(graphql.ObjectConfig{
	Name: "LanguageType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"Value": &graphql.Field{
			Type: graphql.String,
		},

		"Records": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
	},
})
