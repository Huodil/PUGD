package CirculationTypes

import "github.com/graphql-go/graphql"

var SubscriptionType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SubscriptionType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"DateSub": &graphql.Field{
			Type: graphql.String,
		},
		"CodeSub": &graphql.Field{
			Type: graphql.String,
		},
		"DateEnd": &graphql.Field{
			Type: graphql.String,
		},
		"Periodicity": &graphql.Field{
			Type: graphql.String,
		},
	},
})
