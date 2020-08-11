package authorityQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"regexp"
)

var GetAuthors = &graphql.Field{
	Type: graphql.NewList(authorityTypes.AuthorTypeOutput),
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"author_type": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"name_auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"indexname_auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"year_birth": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"year_death": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},

		"city_auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"country_auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"website_auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"isni_auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"subdivision_auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"urlthumbnail_auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"note_auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_authorities": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"all_fields": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"skip": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"limit": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		filter := bson.M{}

		if p.Args["id"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["id"].(string)); err == nil {
				filter["_id"] = id
			} else {
				return nil, err
			}
		}
		if p.Args["from"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["from"].(string)); err == nil {
				filter["_id"] = bson.M{
					"$gt": id,
				}
			} else {
				return nil, err
			}
		}
		if author_type, author_typeOK := p.Args["author_type"].(int); author_typeOK {
			if author_type != 0 {
				filter["author_type"] = author_type
			}
		}
		if name_auth := p.Args["name_auth"]; name_auth != nil {
			filter["name_auth"] = primitive.Regex{Pattern: name_auth.(string), Options: ""}
		}
		if indexname_auth := p.Args["indexname_auth"]; indexname_auth != nil {
			filter["indexname_auth"] = primitive.Regex{Pattern: indexname_auth.(string), Options: ""}
		}
		if year_birth := p.Args["year_birth"]; year_birth != nil {
			filter["year_birth"] = year_birth.(int)
		}
		if year_death := p.Args["year_death"]; year_death != nil {
			filter["year_death"] = year_death.(int)
		}
		if city_auth := p.Args["city_auth"]; city_auth != nil {
			filter["city_auth"] = primitive.Regex{Pattern: city_auth.(string), Options: ""}
		}
		if country_auth := p.Args["country_auth"]; country_auth != nil {
			filter["country_auth"] = primitive.Regex{Pattern: country_auth.(string), Options: ""}
		}
		if website_auth := p.Args["website_auth"]; website_auth != nil {
			filter["website_auth"] = primitive.Regex{Pattern: website_auth.(string), Options: ""}
		}
		if isni_auth := p.Args["isni_auth"]; isni_auth != nil {
			filter["isni_auth"] = primitive.Regex{Pattern: isni_auth.(string), Options: ""}
		}
		if note_auth := p.Args["note_auth"]; note_auth != nil {
			filter["note_auth"] = primitive.Regex{Pattern: note_auth.(string), Options: ""}
		}
		if urlthumbnail_auth := p.Args["urlthumbnail_auth"]; urlthumbnail_auth != nil {
			filter["urlthumbnail_auth"] = primitive.Regex{Pattern: urlthumbnail_auth.(string), Options: ""}
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

		filterAllFields := bson.A{}
		if allFields := p.Args["all_fields"]; allFields != nil {
			filterAllFields = append(filterAllFields, bson.D{{"name_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
			filterAllFields = append(filterAllFields, bson.D{{"indexname_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
			filterAllFields = append(filterAllFields, bson.D{{"year_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
			filterAllFields = append(filterAllFields, bson.D{{"city_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
			filterAllFields = append(filterAllFields, bson.D{{"country_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
			filterAllFields = append(filterAllFields, bson.D{{"website_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
			filterAllFields = append(filterAllFields, bson.D{{"isni_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
			filterAllFields = append(filterAllFields, bson.D{{"note_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
		}
		var generalFilter = bson.A{}
		generalFilter = append(generalFilter, filter)
		if len(filterAllFields) > 0 {
			generalFilter = append(generalFilter, bson.M{
				"$or": filterAllFields,
			})
		}
		skipQuery := 0
		if skip, skipOK := p.Args["skip"].(int); skipOK {
			skipQuery = skip
		}
		limitQuery := 10
		if lq, lqOK := p.Args["limit"].(int); lqOK {
			limitQuery = lq
		}
		return (&authorityModels.Author{}).FindMultiple(
			bson.M{
				"$and": generalFilter,
			},skipQuery, limitQuery)

	},
}

var GetAuthorsAllFields = &graphql.Field{
	Type: graphql.NewList(authorityTypes.AuthorTypeOutput),
	Args: graphql.FieldConfigArgument{
		"all_fields": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		//filterAllFields := bson.A{}
		//if allFields := p.Args["all_fields"]; all_fields != nil {
		//	filterAllFields = append(filterAllFields, bson.D{{"name_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
		//	filterAllFields = append(filterAllFields, bson.D{{"indexname_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
		//	filterAllFields = append(filterAllFields, bson.D{{"year_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
		//	filterAllFields = append(filterAllFields, bson.D{{"city_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
		//	filterAllFields = append(filterAllFields, bson.D{{"country_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
		//	filterAllFields = append(filterAllFields, bson.D{{"website_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
		//	filterAllFields = append(filterAllFields, bson.D{{"isni_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
		//	filterAllFields = append(filterAllFields, bson.D{{"note_auth", primitive.Regex{Pattern: regexp.QuoteMeta(allFields.(string)), Options: ""}}})
		//}
		//fmt.Println(filter)
		return (&authorityModels.Author{}).FindMultiple(bson.M{}, 0,10)
	},
}