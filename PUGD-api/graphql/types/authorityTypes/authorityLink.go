package authorityTypes

import "github.com/graphql-go/graphql"

var AuthorityLinkType = graphql.NewObject(graphql.ObjectConfig{
	Name: "AuthorityLinkType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"root_authority_type": &graphql.Field{
			Type: graphql.String,
		},
		"root_authority_id": &graphql.Field{
			Type: ObjectID,
		},
		"linked_authority_type": &graphql.Field{
			Type: graphql.Int,
		},
		"linked_authority_id": &graphql.Field{
			Type: ObjectID,
		},
		"start": &graphql.Field{
			Type: graphql.String,
		},
		"end": &graphql.Field{
			Type: graphql.String,
		},
		"comment": &graphql.Field{
			Type: graphql.String,
		},
		"linktype": &graphql.Field{
			Type: graphql.Int,
		},
	},
	IsTypeOf: func(p graphql.IsTypeOfParams) bool {
		return true
	},
})
var AuthorityLinkInputType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "AuthorityLinkInputType",
	Fields: graphql.InputObjectConfigFieldMap{
		"_id": &graphql.InputObjectFieldConfig{
			Type: graphql.ID,
		},
		"Root_Authority_Type": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"Root_Authority_Id": &graphql.InputObjectFieldConfig{
			Type: graphql.ID,
		},
		"Linked_Authority_Type": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"Linked_Authority_Id": &graphql.InputObjectFieldConfig{
			Type: graphql.ID,
		},
		"Start": &graphql.InputObjectFieldConfig{
			Type: graphql.DateTime,
		},
		"End": &graphql.InputObjectFieldConfig{
			Type: graphql.DateTime,
		},
		"Comment": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"LinkType": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
	},
})
