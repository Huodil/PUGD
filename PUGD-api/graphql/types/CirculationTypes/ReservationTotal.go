package CirculationTypes

import (
	"github.com/graphql-go/graphql"
)

var Totals = graphql.NewObject(graphql.ObjectConfig{
	Name: "Totals",
	Fields: graphql.Fields{
		"Total": &graphql.Field{
			Type: graphql.Int,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return p.Source, nil
			},
		},
	},
})
