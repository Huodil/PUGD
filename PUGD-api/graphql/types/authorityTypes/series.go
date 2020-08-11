package authorityTypes

import "github.com/graphql-go/graphql"

var SeriesType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SeriesType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"issn": &graphql.Field{
			Type: graphql.String,
		},
		"publisher": &graphql.Field{
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
var SeriesOutputType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SeriesOutputType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"issn": &graphql.Field{
			Type: graphql.String,
		},
		"publisher": &graphql.Field{
			Type: PublisherType,
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
