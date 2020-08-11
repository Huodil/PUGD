package types

import "github.com/graphql-go/graphql"

var TokenType = graphql.NewObject(graphql.ObjectConfig{
	Name: "tokenType",
	Fields: graphql.Fields{
		"token": &graphql.Field{
			Type: graphql.String,
		},
		"expire": &graphql.Field{
			Type: graphql.String,
		},
	},
})
