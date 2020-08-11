package authoritiesMutations

import (
	"context"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"go.mongodb.org/mongo-driver/bson"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertCollectionTitle = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Url_thumbnail": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_authorities": &graphql.ArgumentConfig{
			Type: graphql.NewList(authorityTypes.AuthorityLinkInputType),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		collectionTitle := authorityModels.CollectionTitle{}

		if Title := p.Args["Title"]; Title != nil {
			collectionTitle.Title = Title.(string)
		}
		if Url_thumbnail := p.Args["Url_thumbnail"]; Url_thumbnail != nil {
			collectionTitle.Url_thumbnail = Url_thumbnail.(string)
		}

		if Linked_authorities := p.Args["Linked_authorities"]; Linked_authorities != nil {
			var Linked_authorities_id_list = []primitive.ObjectID{}

			Linked_authorities_List := Linked_authorities.([]interface{})

			for i := 0; i < len(Linked_authorities_List); i++ {
				at := Linked_authorities_List[i].(map[string]interface{})
				//fmt.Println("loop",i,Linked_authorities_List[i].(map[string]interface {})["Comment"])
				authorityLink := authorityModels.AuthorityLink{}
				if at["Start"] != nil {
					authorityLink.Start = at["Start"].(time.Time)
				}
				if at["End"] != nil {
					authorityLink.End = at["End"].(time.Time)
				}
				if at["Comment"] != nil {
					authorityLink.Comment = at["Comment"].(string)
				}
				if at["LinkType"] != nil {
					authorityLink.LinkType = at["LinkType"].(int)
				}
				//if  at["Root_Authority_Type"] != nil {authorityLink.Root_Authority_Type=at["Root_Authority_Type"].(string)}
				if at["Linked_Authority_Type"] != nil {
					authorityLink.Linked_Authority_Type = at["Linked_Authority_Type"].(int)
				}
				if at["Linked_Authority_Id"] != nil {
					if id, err := primitive.ObjectIDFromHex(at["Linked_Authority_Id"].(string)); err == nil {
						authorityLink.Linked_Authority_Id = id
					}
				}
				id, err := authorityLink.Store()
				if err == nil {
					Linked_authorities_id_list = append(Linked_authorities_id_list, *id)
				}

			}
			collectionTitle.Linked_authorities = Linked_authorities_id_list
		}
		return collectionTitle.Store()

	},
}

var UpdateCollectionTitle = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Url_thumbnail": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_authorities": &graphql.ArgumentConfig{
			Type: graphql.NewList(authorityTypes.AuthorityLinkInputType),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		_id, err := primitive.ObjectIDFromHex(p.Args["Id"].(string))
		if err != nil {
			return nil, err
		}
		collectionTitle := authorityModels.CollectionTitle{}
		collectionTitle.Id = _id
		CollectionTitleUpdate := bson.M{}

		if Title := p.Args["Title"]; Title != nil {
			CollectionTitleUpdate["title"] = Title.(string)
		}
		if Url_thumbnail := p.Args["Url_thumbnail"]; Url_thumbnail != nil {
			CollectionTitleUpdate["url_thumbnail"] = Url_thumbnail.(string)
		}

		if Linked_authorities := p.Args["Linked_authorities"]; Linked_authorities != nil {
			var Linked_authorities_id_list = []primitive.ObjectID{}

			Linked_authorities_List := Linked_authorities.([]interface{})

			for i := 0; i < len(Linked_authorities_List); i++ {
				at := Linked_authorities_List[i].(map[string]interface{})
				//fmt.Println("loop",i,Linked_authorities_List[i].(map[string]interface {})["Comment"])
				authorityLink := authorityModels.AuthorityLink{}
				if at["Start"] != nil {
					authorityLink.Start = at["Start"].(time.Time)
				}
				if at["End"] != nil {
					authorityLink.End = at["End"].(time.Time)
				}
				if at["Comment"] != nil {
					authorityLink.Comment = at["Comment"].(string)
				}
				if at["LinkType"] != nil {
					authorityLink.LinkType = at["LinkType"].(int)
				}
				//if  at["Root_Authority_Type"] != nil {authorityLink.Root_Authority_Type=at["Root_Authority_Type"].(string)}
				if at["Linked_Authority_Type"] != nil {
					authorityLink.Linked_Authority_Type = at["Linked_Authority_Type"].(int)
				}
				if at["Linked_Authority_Id"] != nil {
					if id, err := primitive.ObjectIDFromHex(at["Linked_Authority_Id"].(string)); err == nil {
						authorityLink.Linked_Authority_Id = id
					}
				}
				id, err := authorityLink.Store()
				if err == nil {
					Linked_authorities_id_list = append(Linked_authorities_id_list, *id)
				}

			}
			CollectionTitleUpdate["linked_authorities"] = Linked_authorities_id_list
		}

		return collectionTitle.Update(CollectionTitleUpdate)

	},
}

var DeleteCollectionTitle = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("collection_title")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
