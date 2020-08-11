package CatalogingTypes

import "github.com/graphql-go/graphql"

var KeyWordType = graphql.NewObject(graphql.ObjectConfig{
	Name: "keyWordType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"Word": &graphql.Field{
			Type: graphql.String,
		},

		"Lang": &graphql.Field{
			Type: graphql.String,
		},
		"Records": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
	},
})
