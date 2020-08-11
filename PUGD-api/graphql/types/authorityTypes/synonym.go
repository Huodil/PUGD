package authorityTypes

import "github.com/graphql-go/graphql"

var SynonymType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SynonymType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"word": &graphql.Field{
			Type: graphql.String,
		},
		"leads_to": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
	},
})
var SynonymTypeOuput = graphql.NewObject(graphql.ObjectConfig{
	Name: "SynonymTypeOuput",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"word": &graphql.Field{
			Type: graphql.String,
		},
		"leads_to": &graphql.Field{
			Type: graphql.NewList(SynonymType),
		},
	},
})
