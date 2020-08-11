package authorityTypes

import "github.com/graphql-go/graphql"

var CategoryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CategoryType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"record": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"scope_note": &graphql.Field{
			Type: graphql.String,
		},
		"comment": &graphql.Field{
			Type: graphql.String,
		},
		"broader_term": &graphql.Field{
			Type: ObjectID,
		},
		"see": &graphql.Field{
			Type: ObjectID,
		},
		"see_also": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},
		"authority_number": &graphql.Field{
			Type: graphql.Int,
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
var CategoryOutputType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CategoryOutputType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"record": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"scope_note": &graphql.Field{
			Type: graphql.String,
		},
		"comment": &graphql.Field{
			Type: graphql.String,
		},
		"broader_term": &graphql.Field{
			Type: CategoryType,
		},
		"see": &graphql.Field{
			Type: CategoryType,
		},
		"see_also": &graphql.Field{
			Type: graphql.NewList(CategoryType),
		},
		"authority_number": &graphql.Field{
			Type: graphql.Int,
		},
		"url_thumbnail": &graphql.Field{
			Type: graphql.String,
		},
		"linked_authorities": &graphql.Field{
			Type: graphql.NewList(AuthorityLinkType),
		},
	},
})
