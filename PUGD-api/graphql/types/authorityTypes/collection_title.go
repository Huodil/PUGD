package authorityTypes

import (
	"github.com/graphql-go/graphql"
	"log"
)

var CollectionTitleType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CollectionTitle",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"url_thumbnail": &graphql.Field{
			Type: graphql.String,
		},
		"linked_authorities": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},
	},
	IsTypeOf:func(p graphql.IsTypeOfParams) bool{
		log.Println(p)
		return true
	},
})
var CollectionOutputTitleType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CollectionOutputTitleType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"title": &graphql.Field{
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
