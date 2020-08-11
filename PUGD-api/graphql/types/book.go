package types

import "github.com/graphql-go/graphql"

var BookType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BookType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"isbn": &graphql.Field{
			Type: graphql.String,
		},
	},
})
