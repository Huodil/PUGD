package authorityQueries

import (
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetCollectionTitle = &graphql.Field{
	Type: graphql.NewList(authorityTypes.CollectionOutputTitleType),
	Args: graphql.FieldConfigArgument{
		"Id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Title": &graphql.ArgumentConfig{
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
		if URL_thumbnail := p.Args["URL_thumbnail"]; URL_thumbnail != nil {
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
		fmt.Println(filter)
		return (&authorityModels.CollectionTitle{}).FindMultiple(filter)
	},
}
