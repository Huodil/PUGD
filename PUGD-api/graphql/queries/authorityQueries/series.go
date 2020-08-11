package authorityQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"regexp"
)

var GetSeries = &graphql.Field{
	Type: graphql.NewList(authorityTypes.SeriesOutputType),
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Issn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Publisher": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Website": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Comment": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Url_thumbnail": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_authorities": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		filter := bson.M{}
		if idHex, idHexOk := p.Args["Id"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			filter["_id"] = id

		}

		if Title := p.Args["Title"]; Title != nil {
			filter["title"] = primitive.Regex{Pattern: Title.(string), Options: ""}
		}
		if Issn := p.Args["Issn"]; Issn != nil {
			filter["issn"] = primitive.Regex{Pattern: Issn.(string), Options: ""}
		}
		if p.Args["Publisher"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Publisher"].(string)); err != nil {
				filter["publisher"] = id
			}
		}
		if Website := p.Args["Website"]; Website != nil {
			filter["website"] = primitive.Regex{Pattern: Website.(string), Options: ""}
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			filter["comment"] = primitive.Regex{Pattern: Comment.(string), Options: ""}
		}
		if URL_thumbnail := p.Args["Url_thumbnail"]; URL_thumbnail != nil {
			filter["url_thumbnail"] = primitive.Regex{Pattern: URL_thumbnail.(string), Options: ""}
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
		return (&authorityModels.Series{}).FindMultiple(filter)
	},
}

var GetSeriesAllFields = &graphql.Field{
	Type: graphql.NewList(authorityTypes.SeriesType),
	Args: graphql.FieldConfigArgument{

		"all_fields": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		filter := bson.A{}
		if all_fields := p.Args["all_fields"]; all_fields != nil {
			filter = append(filter, bson.D{{"title", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"issn", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"website", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
			filter = append(filter, bson.D{{"comment", primitive.Regex{Pattern: regexp.QuoteMeta(all_fields.(string)), Options: ""}}})
		}
		return (&authorityModels.Series{}).FindMultiple(bson.M{
			"$or": filter,
		})
	},
}
