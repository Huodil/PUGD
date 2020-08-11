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

var InsertSubSeries = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Issn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Publisher": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Parent_series": &graphql.ArgumentConfig{
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
			Type: graphql.NewList(authorityTypes.AuthorityLinkInputType),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		subSeries := authorityModels.SubSeries{}

		if Name := p.Args["Name"]; Name != nil {
			subSeries.Name = Name.(string)
		}
		if Issn := p.Args["Issn"]; Issn != nil {
			subSeries.Issn = Issn.(string)
		}
		if p.Args["Publisher"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Publisher"].(string)); err == nil {
				subSeries.Publisher = id
			} else {
				return nil, err
			}
		}
		if p.Args["Parent_series"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Parent_series"].(string)); err == nil {
				subSeries.Parent_series = id
			} else {
				return nil, err
			}
		}
		if Website := p.Args["Website"]; Website != nil {
			subSeries.Website = Website.(string)
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			subSeries.Comment = Comment.(string)
		}
		if Url_thumbnail := p.Args["Url_thumbnail"]; Url_thumbnail != nil {
			subSeries.Url_thumbnail = Url_thumbnail.(string)
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
			subSeries.Linked_authorities = Linked_authorities_id_list
		}
		return subSeries.Store()

	},
}

var UpdateSubSeries = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Issn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Publisher": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Parent_series": &graphql.ArgumentConfig{
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
			Type: graphql.NewList(authorityTypes.AuthorityLinkInputType),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		subSeries := authorityModels.SubSeries{}
		subSeries.Id = _id
		SubSeriesUpdate := bson.M{}

		if Name := p.Args["Name"]; Name != nil {
			SubSeriesUpdate["name"] = Name.(string)
		}
		if Issn := p.Args["Issn"]; Issn != nil {
			SubSeriesUpdate["issn"] = Issn.(string)
		}
		if p.Args["Publisher"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Publisher"].(string)); err == nil {
				SubSeriesUpdate["publisher"] = id
			} else {
				return nil, err
			}
		}
		if p.Args["Parent_series"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Parent_series"].(string)); err == nil {
				SubSeriesUpdate["parent_series"] = id
			} else {
				return nil, err
			}
		}
		if Website := p.Args["Website"]; Website != nil {
			SubSeriesUpdate["website"] = Website.(string)
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			SubSeriesUpdate["comment"] = Comment.(string)
		}
		if Url_thumbnail := p.Args["Url_thumbnail"]; Url_thumbnail != nil {
			SubSeriesUpdate["url_thumbnail"] = Url_thumbnail.(string)
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
			SubSeriesUpdate["linked_authorities"] = Linked_authorities_id_list
		}

		return subSeries.Update(SubSeriesUpdate)

	},
}

var DeleteSubSeries = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("sub_series")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		//find the sub serie
		subseries := authorityModels.SubSeries{}
		filter := bson.M{}
		filter["_id"] = _id
		c, _ := (&authorityModels.SubSeries{}).FindMultiple(filter)
		jsonbody, err := json.Marshal(c)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		if err := json.Unmarshal(jsonbody, &subseries); err != nil {
			fmt.Println(err)
			return nil, err
		}

		//remove the id of the sub serie from from the record
		for j := 0; j < len(subseries.Record); j++ {
			record := utils.SearchRecord(subseries.Record[j])
			if record != nil {
				_ = utils.UpdateRecordIDs(record.Id, "fksubseries", nil)
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
