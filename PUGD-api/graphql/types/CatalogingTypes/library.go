package CatalogingTypes

import "github.com/graphql-go/graphql"

var LibraryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "LibraryType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"Name": &graphql.Field{
			Type: graphql.String,
		},

		"Address": &graphql.Field{
			Type: graphql.String,
		},
	},
})
