package authorityTypes

import "github.com/graphql-go/graphql"

var StopwordType = graphql.NewObject(graphql.ObjectConfig{
	Name: "StopwordType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"word": &graphql.Field{
			Type: graphql.String,
		},
		"type": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
