package authoritiesMutations

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"go.mongodb.org/mongo-driver/bson"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertCategory = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Record": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
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
		"Broader_term": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"See": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"See_also": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Authority_number": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"URL_thumbnail": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_authorities": &graphql.ArgumentConfig{
			Type: graphql.NewList(authorityTypes.AuthorityLinkInputType),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		fmt.Println(p.Args["Name"])
		category := authorityModels.Category{}

		if Record := p.Args["Record"]; Record != nil {
			// convert the list to an interface array
			Record_List := Record.([]interface{})
			// the resulting array
			var ObjectIdList = []primitive.ObjectID{}

			for i := 0; i < len(Record_List); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(Record_List[i].(string))
				if err != nil {
					return nil, err
				}
				ObjectIdList = append(ObjectIdList, _id)
			}
			category.Record = ObjectIdList
		}

		if Name := p.Args["Name"]; Name != nil {
			category.Name = Name.(string)
		}
		if Scope_note := p.Args["Scope_note"]; Scope_note != nil {
			category.Scope_note = Scope_note.(string)
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			category.Comment = Comment.(string)
		}
		if p.Args["Broader_term"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Broader_term"].(string)); err == nil {
				category.Broader_term = id
			} else {
				return nil, err
			}
		}

		if p.Args["See"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["See"].(string)); err == nil {
				category.See = id
			} else {
				return nil, err
			}
		}
		if See_also := p.Args["See_also"]; See_also != nil {
			// convert the list to an interface array
			See_also_List := See_also.([]interface{})
			// the resulting array
			var ObjectIdList = []primitive.ObjectID{}

			for i := 0; i < len(See_also_List); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(See_also_List[i].(string))
				if err != nil {
					return nil, err
				}
				ObjectIdList = append(ObjectIdList, _id)
			}
			category.See_also = ObjectIdList
		}

		if Authority_number := p.Args["Authority_number"]; Authority_number != nil {
			category.Authority_number = Authority_number.(int)
		}
		if URL_thumbnail := p.Args["URL_thumbnail"]; URL_thumbnail != nil {
			category.URL_thumbnail = URL_thumbnail.(string)
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
			category.Linked_authorities = Linked_authorities_id_list
		}
		return category.Store()

	},
}

var UpdateCategory = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Record": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
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
		"Broader_term": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"See": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"See_also": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Authority_number": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"URL_thumbnail": &graphql.ArgumentConfig{
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

		category := authorityModels.Category{}
		category.Id = _id

		CategoryUpdate := bson.M{}

		if Record := p.Args["Record"]; Record != nil {
			// convert the list to an interface array
			Record_List := Record.([]interface{})
			// the resulting array
			var ObjectIdList = []primitive.ObjectID{}

			for i := 0; i < len(Record_List); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(Record_List[i].(string))
				if err != nil {
					return nil, err
				}
				ObjectIdList = append(ObjectIdList, _id)
			}
			CategoryUpdate["record"] = ObjectIdList
		}

		if Name := p.Args["Name"]; Name != nil {
			CategoryUpdate["name"] = Name.(string)
		}
		if Scope_note := p.Args["Scope_note"]; Scope_note != nil {
			CategoryUpdate["scope_note"] = Scope_note.(string)
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			CategoryUpdate["comment"] = Comment.(string)
		}

		if See, SeeOk := p.Args["See"].(string); SeeOk {
			if id, err := primitive.ObjectIDFromHex(See); err != nil {
				return nil, err
			} else {
				CategoryUpdate["see"] = id
			}
		}
		if broaderTerm, broaderTermOk := p.Args["Broader_term"].(string); broaderTermOk {
			if id, err := primitive.ObjectIDFromHex(broaderTerm); err != nil {
				return nil, err
			} else {
				CategoryUpdate["broader_term"] = id
			}
		}
		if See_also := p.Args["See_also"]; See_also != nil {
			// convert the list to an interface array
			See_also_List := See_also.([]interface{})
			// the resulting array
			var ObjectIdList = []primitive.ObjectID{}

			for i := 0; i < len(See_also_List); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(See_also_List[i].(string))
				if err != nil {
					return nil, err
				}
				ObjectIdList = append(ObjectIdList, _id)
			}
			CategoryUpdate["see_also"] = ObjectIdList
		}

		if Authority_number := p.Args["Authority_number"]; Authority_number != nil {
			CategoryUpdate["authority_number"] = Authority_number.(int)
		}
		if URL_thumbnail := p.Args["URL_thumbnail"]; URL_thumbnail != nil {
			CategoryUpdate["url_thumbnail"] = URL_thumbnail.(string)
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
			CategoryUpdate["linked_authorities"] = Linked_authorities_id_list
		}
		fmt.Println(CategoryUpdate)
		return category.Update(CategoryUpdate)

	},
}

var DeleteCategory = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("category")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		//find the catagory
		category := authorityModels.Category{}
		filter := bson.M{}
		filter["_id"] = _id
		c, _ := (&authorityModels.Category{}).FindMultiple(filter)
		jsonbody, err := json.Marshal(c)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		if err := json.Unmarshal(jsonbody, &category); err != nil {
			fmt.Println(err)
			return nil, err
		}

		//remove the id of the category from from the record
		for j := 0; j < len(category.Record); j++ {
			record := utils.SearchRecord(category.Record[j])
			if record != nil {
				s := utils.DeleteFromSliceOfIds(_id, record.Category)
				_ = utils.UpdateRecordIDs(record.Id, "catagory", s)
			}
		}
		//remove the id of the category from from the serial
		for j := 0; j < len(category.Serial); j++ {
			serial := utils.SearchRecord(category.Serial[j])
			if serial != nil {
				s := utils.DeleteFromSliceOfIds(_id, serial.Category)
				_ = utils.UpdateSerialIDs(serial.Id, "catagory", s)
			}
		}
		// do the delete
		log.Println(_id)
		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
