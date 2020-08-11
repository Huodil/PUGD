package authorityTypes

import "github.com/graphql-go/graphql"

var ClassNumberType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ClassNumberType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"subject_description": &graphql.Field{
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
		return true
	},
})
var ClassNumberOutputType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ClassNumberOutputType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"subject_description": &graphql.Field{
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
