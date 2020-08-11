package authorityTypes

import (
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var AuthorType = graphql.NewObject(graphql.ObjectConfig{
	Name: "AuthorType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"author_type": &graphql.Field{
			Type: graphql.Int,
		},
		"name_auth": &graphql.Field{
			Type: graphql.String,
		},
		"indexname_auth": &graphql.Field{
			Type: graphql.String,
		},
		"year_birth": &graphql.Field{
			Type: graphql.Int,
		},
		"year_death": &graphql.Field{
			Type: graphql.Int,
		},
		"city_auth": &graphql.Field{
			Type: graphql.String,
		},
		"country_auth": &graphql.Field{
			Type: graphql.String,
		},
		"website_auth": &graphql.Field{
			Type: graphql.String,
		},
		"isni_auth": &graphql.Field{
			Type: graphql.String,
		},
		"subdivision_auth": &graphql.Field{
			Type: graphql.String,
		},
		"url_thumbnail_auth": &graphql.Field{
			Type: graphql.String,
		},
		"note_auth": &graphql.Field{
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
var AuthorTypeOutput = graphql.NewObject(graphql.ObjectConfig{
	Name: "AuthorTypeOutput",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"author_type": &graphql.Field{
			Type: graphql.Int,
		},

		"name_auth": &graphql.Field{
			Type: graphql.String,
		},
		"indexname_auth": &graphql.Field{
			Type: graphql.String,
		},
		"year_birth": &graphql.Field{
			Type: graphql.Int,
		},
		"year_death": &graphql.Field{
			Type: graphql.Int,
		},
		"city_auth": &graphql.Field{
			Type: graphql.String,
		},
		"country_auth": &graphql.Field{
			Type: graphql.String,
		},
		"website_auth": &graphql.Field{
			Type: graphql.String,
		},
		"isni_auth": &graphql.Field{
			Type: graphql.String,
		},
		"subdivision_auth": &graphql.Field{
			Type: graphql.String,
		},
		"urlthumbnail_auth": &graphql.Field{
			Type: graphql.String,
		},
		"note_auth": &graphql.Field{
			Type: graphql.String,
		},
		"linked_authorities": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
		"linked_authoritiess": &graphql.Field{
			Type: graphql.NewList(AuthorityLinkType),
		},
	},
})

var ObjectID = graphql.NewScalar(graphql.ScalarConfig{
	Name:        "BSON",
	Description: "The `bson` scalar type represents a BSON Object.",
	// Serialize serializes `bson.ObjectId` to string.
	Serialize: func(value interface{}) interface{} {
		switch value := value.(type) {
		case primitive.ObjectID:
			return value.Hex()
		case *primitive.ObjectID:
			v := *value
			return v.Hex()
		default:
			return nil
		}
	},
	// ParseValue parses GraphQL variables from `string` to `bson.ObjectId`.
	ParseValue: func(value interface{}) interface{} {
		switch value := value.(type) {
		case string:
			id, _ := primitive.ObjectIDFromHex(value)
			return id
		case *string:
			id, _ := primitive.ObjectIDFromHex(*value)
			return id
		default:
			return nil
		}
		return nil
	},
	// ParseLiteral parses GraphQL AST to `bson.ObjectId`.
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
		case *ast.StringValue:
			id, _ := primitive.ObjectIDFromHex(valueAST.Value)
			return id
		}
		return nil
	},
})
