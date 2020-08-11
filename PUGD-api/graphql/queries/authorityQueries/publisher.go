package authorityQueries

import (
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"regexp"
)

var GetPublishers = &graphql.Field{
	Type: graphql.NewList(authorityTypes.PublisherOutputType),
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Address1": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Address2": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Post_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"City": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Country": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Website": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"note": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_authorities": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		filter := bson.M{}
		if idHex, idHexOk := p.Args["id"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			filter["_id"] = id
		}
		fmt.Println("filter",filter)
		if Name := p.Args["Name"]; Name != nil {
			filter["name"] = primitive.Regex{Pattern: Name.(string), Options: ""}
		}
		if Address1 := p.Args["Address1"]; Address1 != nil {
			filter["address1"] = primitive.Regex{Pattern: Address1.(string), Options: ""}
		}
		if Address2 := p.Args["Address2"]; Address2 != nil {
			filter["address2"] = primitive.Regex{Pattern: Address2.(string), Options: ""}
		}
		if Post_code := p.Args["Post_code"]; Post_code != nil {
			filter["post_code"] = primitive.Regex{Pattern: Post_code.(string), Options: ""}
		}
		if City := p.Args["City"]; City != nil {
			filter["city"] = primitive.Regex{Pattern: City.(string), Options: ""}
		}
		if Country := p.Args["Country"]; Country != nil {
			filter["country"] = primitive.Regex{Pattern: Country.(string), Options: ""}
		}
		if Website := p.Args["Website"]; Website != nil {
			filter["website"] = primitive.Regex{Pattern: Website.(string), Options: ""}
		}
		if note := p.Args["note"]; note != nil {
			filter["note"] = primitive.Regex{Pattern: note.(string), Options: ""}
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
		return (&authorityModels.Publisher{}).FindMultiple(filter)

	},
}

var GetPublishersAllFields = &graphql.Field{
	Type: graphql.NewList(authorityTypes.PublisherType),
	Args: graphql.FieldConfigArgument{

		"all_fields": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		filter := bson.A{}
		if all_fields := p.Args["all_fields"]; all_fields != nil {
			filter = append(filter, bson.D{{"name", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"address1", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"address2", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"post_code", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"city", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"country", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"website", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"note", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})

		}
		return (&authorityModels.Publisher{}).FindMultiple(bson.M{
			"$or": filter,
		})
	},
}
