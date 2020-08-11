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

var InsertSeries = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
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
			Type: graphql.NewList(authorityTypes.AuthorityLinkInputType),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		series := authorityModels.Series{}

		if Title := p.Args["Title"]; Title != nil {
			series.Title = Title.(string)
		}
		if Issn := p.Args["Issn"]; Issn != nil {
			series.Issn = Issn.(string)
		}
		if p.Args["Publisher"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Publisher"].(string)); err == nil {
				series.Publisher = id
			} else {
				return nil, err
			}
		}
		if Website := p.Args["Website"]; Website != nil {
			series.Website = Website.(string)
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			series.Comment = Comment.(string)
		}
		if Url_thumbnail := p.Args["Url_thumbnail"]; Url_thumbnail != nil {
			series.Url_thumbnail = Url_thumbnail.(string)
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
			series.Linked_authorities = Linked_authorities_id_list
		}
		log.Println(p.Args["Url_thumbnail"])
		log.Println(series.Url_thumbnail)
		return series.Store()

	},
}

var UpdateSeries = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
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
			Type: graphql.NewList(authorityTypes.AuthorityLinkInputType),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		series := authorityModels.Series{}
		series.Id = _id
		SeriesUpdate := bson.M{}

		if Title := p.Args["Title"]; Title != nil {
			SeriesUpdate["title"] = Title.(string)
		}
		if Issn := p.Args["Issn"]; Issn != nil {
			SeriesUpdate["issn"] = Issn.(string)
		}
		if p.Args["Publisher"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["Publisher"].(string)); err == nil {
				SeriesUpdate["publisher"] = id
			} else {
				return nil, err
			}
		}
		if Website := p.Args["Website"]; Website != nil {
			SeriesUpdate["website"] = Website.(string)
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			SeriesUpdate["comment"] = Comment.(string)
		}
		if Url_thumbnail := p.Args["Url_thumbnail"]; Url_thumbnail != nil {
			SeriesUpdate["url_thumbnail"] = Url_thumbnail.(string)
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
			SeriesUpdate["linked_authorities"] = Linked_authorities_id_list
		}

		return series.Update(SeriesUpdate)

	},
}

var DeleteSeries = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("series")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		//find the serie
		series := authorityModels.Series{}
		filter := bson.M{}
		filter["_id"] = _id
		c, _ := (&authorityModels.Series{}).FindMultiple(filter)
		jsonbody, err := json.Marshal(c)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		if err := json.Unmarshal(jsonbody, &series); err != nil {
			fmt.Println(err)
			return nil, err
		}

		//remove the id of the serie from from the record
		for j := 0; j < len(series.Record); j++ {
			record := utils.SearchRecord(series.Record[j])
			if record != nil {
				_ = utils.UpdateRecordIDs(record.Id, "fkseries", nil)
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
