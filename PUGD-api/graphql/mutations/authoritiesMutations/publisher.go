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

var InsertPublisher = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
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
		"Supplier": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"note": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"url_thumbnail": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_authorities": &graphql.ArgumentConfig{
			Type: graphql.NewList(authorityTypes.AuthorityLinkInputType),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		publisher := authorityModels.Publisher{}

		if Name := p.Args["Name"]; Name != nil {
			publisher.Name = Name.(string)
		}
		if Address1 := p.Args["Address1"]; Address1 != nil {
			publisher.Address1 = Address1.(string)
		}
		if Address2 := p.Args["Address2"]; Address2 != nil {
			publisher.Address2 = Address2.(string)
		}
		if Post_code := p.Args["Post_code"]; Post_code != nil {
			publisher.Post_code = Post_code.(string)
		}
		if City := p.Args["City"]; City != nil {
			publisher.City = City.(string)
		}
		if Country := p.Args["Country"]; Country != nil {
			publisher.Country = Country.(string)
		}
		if Website := p.Args["Website"]; Website != nil {
			publisher.Website = Website.(string)
		}

		if p.Args["Supplier"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Supplier"].(string)); err == nil {
				publisher.Supplier = id
			} else {
				return nil, err
			}
		}

		if Note := p.Args["note"]; Note != nil {
			publisher.Note = Note.(string)
		}
		if Url_thumbnail := p.Args["url_thumbnail"]; Url_thumbnail != nil {
			publisher.Url_thumbnail = Url_thumbnail.(string)
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
			publisher.Linked_authorities = Linked_authorities_id_list
		}
		return publisher.Store()

	},
}

var UpdatePublisher = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
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
		"Supplier": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"note": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"url_thumbnail": &graphql.ArgumentConfig{
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

		publisher := authorityModels.Publisher{}
		publisher.Id = _id
		PublisherUpdate := bson.M{}
		if Name := p.Args["Name"]; Name != nil {
			PublisherUpdate["name"] = Name.(string)
		}
		if Address1 := p.Args["Address1"]; Address1 != nil {
			PublisherUpdate["address1"] = Address1.(string)
		}
		if Address2 := p.Args["Address2"]; Address2 != nil {
			PublisherUpdate["address2"] = Address2.(string)
		}
		if Post_code := p.Args["Post_code"]; Post_code != nil {
			PublisherUpdate["post_code"] = Post_code.(string)
		}
		if City := p.Args["City"]; City != nil {
			PublisherUpdate["city"] = City.(string)
		}
		if Country := p.Args["Country"]; Country != nil {
			PublisherUpdate["country"] = Country.(string)
		}
		if Website := p.Args["Website"]; Website != nil {
			PublisherUpdate["website"] = Website.(string)
		}

		if p.Args["Supplier"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Supplier"].(string)); err == nil {
				PublisherUpdate["supplier"] = id
			} else {
				return nil, err
			}
		}

		if Note := p.Args["note"]; Note != nil {
			PublisherUpdate["note"] = Note.(string)
		}
		if Url_thumbnail := p.Args["url_thumbnail"]; Url_thumbnail != nil {
			PublisherUpdate["url_thumbnail"] = Url_thumbnail.(string)
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
			PublisherUpdate["linked_authorities"] = Linked_authorities_id_list
		}

		return publisher.Update(PublisherUpdate)

	},
}

var DeletePublisher = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("publisher")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		//find the class number
		publisher := authorityModels.Publisher{}
		filter := bson.M{}
		filter["_id"] = _id
		c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
		jsonbody, err := json.Marshal(c)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		if err := json.Unmarshal(jsonbody, &publisher); err != nil {
			fmt.Println(err)
			return nil, err
		}

		//remove the id of the publisher from from the record
		for j := 0; j < len(publisher.Record); j++ {
			record := utils.SearchRecord(publisher.Record[j])
			if record != nil {
				_ = utils.UpdateRecordIDs(record.Id, "publishers", nil)
			}
		}
		//remove the id of the publisher from from the serial
		for j := 0; j < len(publisher.Serial); j++ {
			serial := utils.SearchRecord(publisher.Serial[j])
			if serial != nil {
				_ = utils.UpdateSerialIDs(serial.Id, "publishers", nil)
			}
		}
		//remove the id of the other publisher from from the record
		for j := 0; j < len(publisher.RecordOtherPublisher); j++ {
			record := utils.SearchRecord(publisher.RecordOtherPublisher[j])
			if record != nil {
				_ = utils.UpdateRecordIDs(record.Id, "otherpublishers", nil)
			}
		}
		//remove the id of the other publisher from from the serial
		for j := 0; j < len(publisher.SerialOtherPublisher); j++ {
			serial := utils.SearchRecord(publisher.SerialOtherPublisher[j])
			if serial != nil {
				_ = utils.UpdateSerialIDs(serial.Id, "otherpublishers", nil)
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
