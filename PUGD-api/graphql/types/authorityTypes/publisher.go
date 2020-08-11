package authorityTypes

import "github.com/graphql-go/graphql"

var PublisherType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PublisherType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"address1": &graphql.Field{
			Type: graphql.String,
		},
		"address2": &graphql.Field{
			Type: graphql.String,
		},
		"post_code": &graphql.Field{
			Type: graphql.String,
		},
		"city": &graphql.Field{
			Type: graphql.String,
		},
		"country": &graphql.Field{
			Type: graphql.String,
		},
		"website": &graphql.Field{
			Type: graphql.String,
		},
		"supplier": &graphql.Field{
			Type: ObjectID,
		},
		"note": &graphql.Field{
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
var PublisherOutputType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PublisherOutputType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type:  ObjectID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"address1": &graphql.Field{
			Type: graphql.String,
		},
		"address2": &graphql.Field{
			Type: graphql.String,
		},
		"post_code": &graphql.Field{
			Type: graphql.String,
		},
		"city": &graphql.Field{
			Type: graphql.String,
		},
		"country": &graphql.Field{
			Type: graphql.String,
		},
		"website": &graphql.Field{
			Type: graphql.String,
		},
		"supplier": &graphql.Field{
			Type: PublisherType,
		},
		"note": &graphql.Field{
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
