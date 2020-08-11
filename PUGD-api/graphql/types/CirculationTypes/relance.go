package CirculationTypes

import "github.com/graphql-go/graphql"

var RelanceType = graphql.NewObject(graphql.ObjectConfig{
	Name: "RelanceType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"Title": &graphql.Field{
			Type: graphql.String,
		},
		"Level": &graphql.Field{
			Type: graphql.String,
		},
		"Validity": &graphql.Field{
			Type: graphql.String,
		},
		/*"Category": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},*/
	},
})
