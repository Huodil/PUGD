package authorityTypes

import "github.com/graphql-go/graphql"

var SubSeriesType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SubSeriesType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"issn": &graphql.Field{
			Type: graphql.String,
		},
		"publisher": &graphql.Field{
			Type: ObjectID,
		},
		"parent_series": &graphql.Field{
			Type: ObjectID,
		},
		"website": &graphql.Field{
			Type: graphql.String,
		},
		"comment": &graphql.Field{
			Type: graphql.String,
		},
		"url_thumbnail": &graphql.Field{
			Type: graphql.String,
		},
		"linked_authorities": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},
	},
	IsTypeOf: func(p graphql.IsTypeOfParams) bool {
		return true
	},
})
var SubSeriesOutputType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SubSeriesOutputType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"issn": &graphql.Field{
			Type: graphql.String,
		},
		"publisher": &graphql.Field{
			Type: PublisherType,
		},
		"parent_series": &graphql.Field{
			Type: SeriesType,
		},
		"website": &graphql.Field{
			Type: graphql.String,
		},
		"comment": &graphql.Field{
			Type: graphql.String,
		},
		"url_thumbnail": &graphql.Field{
			Type: graphql.String,
		},
		"linked_authorities": &graphql.Field{
			Type: graphql.NewList(AuthorityLinkType),
		},
	},
})
