package authorityQueries

import (
	"fmt"
	"log"
	"regexp"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetCategories = &graphql.Field{
	Type: graphql.NewList(authorityTypes.CategoryOutputType),
	Args: graphql.FieldConfigArgument{
		"Id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Scope_note": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Comment": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Authority_number": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"URL_thumbnail": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_authorities": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		log.Printf("got here")
		filter := bson.M{}
		if idHex, idHexOk := p.Args["Id"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			filter["_id"] = id

		}

		if Name := p.Args["Name"]; Name != nil {
			filter["name"] = primitive.Regex{Pattern: Name.(string), Options: ""}
		}
		if Scope_note := p.Args["Scope_note"]; Scope_note != nil {
			filter["scope_note"] = primitive.Regex{Pattern: Scope_note.(string), Options: ""}
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			filter["comment"] = primitive.Regex{Pattern: Comment.(string), Options: ""}
		}
		if URL_thumbnail := p.Args["URL_thumbnail"]; URL_thumbnail != nil {
			filter["url_thumbnail"] = primitive.Regex{Pattern: URL_thumbnail.(string), Options: ""}
		}
		if Authority_number := p.Args["Authority_number"]; Authority_number != nil {
			filter["authority_number"] = Authority_number.(int)
		}

		if LinksList, err := authorityModels.ParseAuthorityLink(p.Args["Linked_authorities"]); err != nil {
			return nil, err
		} else {
			if LinksList != nil {
				filter["linked_authorities"] = bson.D{
					{"$all", LinksList},
				}
			}
		}

		return (&authorityModels.Category{}).FindMultiple(filter)
	},
}

var GetCategoriesAllFields = &graphql.Field{
	Type: graphql.NewList(authorityTypes.CategoryOutputType),
	Args: graphql.FieldConfigArgument{

		"all_fields": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		filter := bson.A{}
		if all_fields := p.Args["all_fields"]; all_fields != nil {
			filter = append(filter, bson.D{{"name", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"scope_note", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"comment", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"url_thumbnail", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
		}
		fmt.Println("freeeee",bson.M{
			"$or": filter,
		})
		return (&authorityModels.Category{}).FindMultiple(bson.M{
			"$or": filter,
		})
	},
}
