package authoritiesMutations

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"go.mongodb.org/mongo-driver/bson"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertClassNumber = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Subject_description": &graphql.ArgumentConfig{
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

		classNumber := authorityModels.ClassNumber{}

		if Name := p.Args["Name"]; Name != nil {
			classNumber.Name = Name.(string)
		}
		if Subject_description := p.Args["Subject_description"]; Subject_description != nil {
			classNumber.Subject_description = Subject_description.(string)
		}
		if Url_thumbnail := p.Args["Url_thumbnail"]; Url_thumbnail != nil {
			classNumber.Url_thumbnail = Url_thumbnail.(string)
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
			classNumber.Linked_authorities = Linked_authorities_id_list
		}
		return classNumber.Store()

	},
}

var UpdateClassNumber = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Subject_description": &graphql.ArgumentConfig{
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

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		classNumber := authorityModels.ClassNumber{}
		classNumber.Id = _id
		ClassNumberUpdate := bson.M{}

		if Name := p.Args["Name"]; Name != nil {
			ClassNumberUpdate["name"] = Name.(string)
		}
		if Subject_description := p.Args["Subject_description"]; Subject_description != nil {
			ClassNumberUpdate["subject_description"] = Subject_description.(string)
		}
		if Url_thumbnail := p.Args["Url_thumbnail"]; Url_thumbnail != nil {
			ClassNumberUpdate["url_thumbnail"] = Url_thumbnail.(string)
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
			ClassNumberUpdate["linked_authorities"] = Linked_authorities_id_list
		}
		fmt.Println(ClassNumberUpdate)
		return classNumber.Update(ClassNumberUpdate)

	},
}

var DeleteClassNumber = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("class_number")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		//find the class number
		class_number := authorityModels.ClassNumber{}
		filter := bson.M{}
		filter["_id"] = _id
		c, _ := (&authorityModels.ClassNumber{}).FindMultiple(filter)
		jsonbody, err := json.Marshal(c)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		if err := json.Unmarshal(jsonbody, &class_number); err != nil {
			fmt.Println(err)
			return nil, err
		}

		//remove the id of the class number from from the record
		for j := 0; j < len(class_number.Record); j++ {
			record := utils.SearchRecord(class_number.Record[j])
			if record != nil {
				s := utils.DeleteFromSliceOfIds(_id, record.ClassNumber)
				_ = utils.UpdateRecordIDs(record.Id, "classnumber", s)
			}
		}
		//remove the id of the class number from from the serial
		for j := 0; j < len(class_number.Serial); j++ {
			serial := utils.SearchRecord(class_number.Serial[j])
			if serial != nil {
				s := utils.DeleteFromSliceOfIds(_id, serial.ClassNumber)
				_ = utils.UpdateSerialIDs(serial.Id, "classnumber", s)
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
