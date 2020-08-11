package authoritiesMutations

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertUniformTitle = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"UniformTitle": &graphql.ArgumentConfig{
			Type: authorityTypes.UniformTitleInputType,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		inputObject := p.Args["UniformTitle"]
		inputObjectMap := inputObject.(map[string]interface{})
		//log.Println("inputObject", inputObject.(map[string]interface {})["linked_authorities"])

		var LinkedAuthoritiesIdList = []primitive.ObjectID{}
		if linked_authorities := inputObjectMap["linked_authorities"]; linked_authorities != nil {
			LinkedAuthoritiesList := linked_authorities.([]interface{})
			for i := 0; i < len(LinkedAuthoritiesList); i++ {
				at := LinkedAuthoritiesList[i].(map[string]interface{})
				authorityLink := authorityModels.AuthorityLink{}
				authorityLink.ConvertAuthorityLink(at)
				id, err := authorityLink.Store()
				if err == nil {
					LinkedAuthoritiesIdList = append(LinkedAuthoritiesIdList, *id)
				}
			}
		}
		delete(inputObjectMap, "linked_authorities")

		log.Println("inputObjectMap", inputObjectMap)

		jsonbody, err := json.Marshal(inputObjectMap)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		uniform_title := authorityModels.UniformTitle{}
		if err := json.Unmarshal(jsonbody, &uniform_title); err != nil {
			fmt.Println(err)
			return nil, err
		}
		uniform_title.Linked_authorities = LinkedAuthoritiesIdList

		//these loops need some refactoring
		for index, element := range uniform_title.Expression_Of {
			if elementIdHex, elementIdHexOk := element["object"].(string); elementIdHexOk {
				id, err := primitive.ObjectIDFromHex(elementIdHex)
				if err != nil {
					return nil, err
				}
				uniform_title.Expression_Of[index]["object"] = id
			}
		}
		for index, element := range uniform_title.Has_Expression {
			if elementIdHex, elementIdHexOk := element["object"].(string); elementIdHexOk {
				id, err := primitive.ObjectIDFromHex(elementIdHex)
				if err != nil {
					return nil, err
				}
				uniform_title.Has_Expression[index]["object"] = id
			}
		}
		for index, element := range uniform_title.Other_Links {
			if elementIdHex, elementIdHexOk := element["object"].(string); elementIdHexOk {
				id, err := primitive.ObjectIDFromHex(elementIdHex)
				if err != nil {
					return nil, err
				}
				uniform_title.Other_Links[index]["object"] = id
			}
		}
		for index, element := range uniform_title.Authors {
			if elementIdHex, elementIdHexOk := element["object"].(string); elementIdHexOk {
				id, err := primitive.ObjectIDFromHex(elementIdHex)
				if err != nil {
					return nil, err
				}
				uniform_title.Authors[index]["object"] = id
			}
		}
		for index, element := range uniform_title.Interpreters {
			if elementIdHex, elementIdHexOk := element["object"].(string); elementIdHexOk {
				id, err := primitive.ObjectIDFromHex(elementIdHex)
				if err != nil {
					return nil, err
				}
				uniform_title.Interpreters[index]["object"] = id
			}
		}
		return uniform_title.Store()

	},
}
var UpdateUniformTitle = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"UniformTitle": &graphql.ArgumentConfig{
			Type: authorityTypes.UniformTitleInputType,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		inputObject := p.Args["UniformTitle"].(map[string]interface{})

		_id, err := primitive.ObjectIDFromHex(p.Args["Id"].(string))
		if err != nil {
			return nil, err
		}
		var uniform_title = authorityModels.UniformTitle{}
		uniform_title.Id = _id
		//delete(inputObject, "_id")
		return uniform_title.Update(inputObject)
	},
}

var DeleteUniformTitle = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("uniform_titles")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		//find the uniform title
		UniformTitle := authorityModels.UniformTitle{}
		filter := bson.M{}
		filter["_id"] = _id
		c, _ := (&authorityModels.UniformTitle{}).FindMultiple(filter)
		jsonbody, err := json.Marshal(c)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		if err := json.Unmarshal(jsonbody, &UniformTitle); err != nil {
			fmt.Println(err)
			return nil, err
		}

		//remove the id of the uniform title from from the record
		for j := 0; j < len(UniformTitle.Record); j++ {
			record := utils.SearchRecord(UniformTitle.Record[j])
			if record != nil {
				s := utils.DeleteFromSliceOfIds(_id, record.CollectionTitle)
				_ = utils.UpdateRecordIDs(record.Id, "collectiontitle", s)
			}
		}

		// do the delete
		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
