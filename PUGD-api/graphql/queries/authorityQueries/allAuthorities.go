package authorityQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"regexp"
)

var GetAuthorities = &graphql.Field{
	Type: graphql.NewList(graphql.NewUnion(graphql.UnionConfig{
		Name: "AllAuthoritiesTypeUnion",
		Types: []*graphql.Object{
			authorityTypes.AuthorTypeOutput,   authorityTypes.CategoryType,
			authorityTypes.AuthorityLinkType, authorityTypes.ClassNumberType,
			authorityTypes.CollectionTitleType, authorityTypes.PublisherType,
			authorityTypes.SeriesType, authorityTypes.SubSeriesType,
			authorityTypes.UniformTitleTypeAuthorities,
		},
		ResolveType: func(p graphql.ResolveTypeParams) *graphql.Object {
			objectMap := p.Value.(primitive.M)
			log.Println(objectMap)
			if _, ok := objectMap["name_auth"]; ok {
				return authorityTypes.AuthorTypeOutput
			}

			if _, ok := objectMap["broader_term"]; ok {
				return authorityTypes.CategoryType
			}
			if _, ok := objectMap["address2"]; ok {
				return authorityTypes.PublisherType
			}
			if _, ok := objectMap["subject_description"]; ok {
				return authorityTypes.ClassNumberType
			}

			if _, ok := objectMap["parent_series"]; ok {
				return authorityTypes.SubSeriesType
			}
			if _, ok := objectMap["issn"]; ok {
				return authorityTypes.SeriesType
			}
			if _, ok := objectMap["expression_of"]; ok {
				return authorityTypes.UniformTitleTypeAuthorities
			}
			if _, ok := objectMap["title"]; ok {
				return authorityTypes.CollectionTitleType
			}
			return authorityTypes.AuthorType
		},
	})),
	Args: graphql.FieldConfigArgument{
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

		all_fieldsString := ""
		if all_fields, all_fieldsOK := p.Args["all_fields"].(string); all_fieldsOK {
			all_fieldsString = all_fields
		}

		skipQuery := 0
		if skip, skipOK := p.Args["skip"].(int); skipOK {
			skipQuery = skip
		}
		limitQuery := 10
		if lq, lqOK := p.Args["limit"].(int); lqOK {
			limitQuery = lq
		}
		var results []bson.M
		filter := bson.A{
			bson.D{{"name", primitive.Regex{Pattern: regexp.QuoteMeta(all_fieldsString), Options: ""}}},
			bson.D{{"title", primitive.Regex{Pattern: regexp.QuoteMeta(all_fieldsString), Options: ""}}},
			bson.D{{"name_auth", primitive.Regex{Pattern: regexp.QuoteMeta(all_fieldsString), Options: ""}}},
			bson.D{{"name_auth", primitive.Regex{Pattern: regexp.QuoteMeta(all_fieldsString), Options: ""}}},
		}
		//return
		if authorsQueryResult, err := (&authorityModels.Author{}).FindMultiple(bson.M{
			"$or": filter}, skipQuery, limitQuery); err == nil {
			println("authorsQueryResult", authorsQueryResult)
			results = append(results, authorsQueryResult...)

		}

		if categoriesQueryResult, err := (&authorityModels.Category{}).FindMultiple(bson.M{
			"$or": filter}); err == nil {
			println("categoriesQueryResult", categoriesQueryResult)
			results = append(results, categoriesQueryResult...)

		}
		return results, nil
	},
}
