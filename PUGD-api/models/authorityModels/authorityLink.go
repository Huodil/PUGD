package authorityModels

import (
	"context"
	"errors"
	"github.com/Harmony-Technology/PUGD-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"time"
)

type AuthorityLink struct {
	Id                    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Root_Authority_Type   string             `json:"root_authority_type"`
	Root_Authority_Id     primitive.ObjectID `json:"root_authority_id"`
	Linked_Authority_Type int             `json:"linked_authority_type"`
	Linked_Authority_Id   primitive.ObjectID `json:"linked_authority_id"`
	Start                 time.Time          `json:"start"`
	End                   time.Time          `json:"end"`
	Comment               string             `json:"comment"`
	LinkType              int                `json:"linktype"`
}

func (al *AuthorityLink) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("authority_link")
	result, errStoring := coll.InsertOne(ctx, al)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (al *AuthorityLink) Update(AuthorityLinkUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("authority_link")

	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": al.Id},

		bson.M{
			"$set": AuthorityLinkUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}

func (al *AuthorityLink) FindMultiple(filter bson.M) ([]*AuthorityLink, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("authority_link")
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal("fatal", err)
			return nil, nil
		}
	}
	var results []*AuthorityLink

	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal(err)
	}

	return results, nil
}

// will convert an array of string into an array of objectIDs
func ParseAuthorityLink(AuthorityLinks interface{}) ([]primitive.ObjectID, error) {
	if AuthorityLinks != nil {
		// convert the list to an interface array
		Linked_authorities_List := AuthorityLinks.([]interface{})
		// the resulting array
		var ObjectIdList = []primitive.ObjectID{}

		for i := 0; i < len(Linked_authorities_List); i++ {
			// Convert every string id to an object id
			_id, err := primitive.ObjectIDFromHex(Linked_authorities_List[i].(string))
			if err != nil {
				return nil, err
			}
			ObjectIdList = append(ObjectIdList, _id)
		}
		return ObjectIdList, nil
	}
	return nil, nil
}

// will convert a map into an AuthorityLink object
func (al *AuthorityLink) ConvertAuthorityLink(Map map[string]interface{}) {

	if Map["Start"] != nil {
		al.Start = Map["Start"].(time.Time)
	}
	if Map["End"] != nil {
		al.End = Map["End"].(time.Time)
	}
	if Map["Comment"] != nil {
		al.Comment = Map["Comment"].(string)
	}
	if Map["LinkType"] != nil {
		al.LinkType = Map["LinkType"].(int)
	}
	if Map["Linked_Authority_Type"] != nil {
		al.Linked_Authority_Type = Map["Linked_Authority_Type"].(int)
	}
	if Map["Linked_Authority_Id"] != nil {
		if id, err := primitive.ObjectIDFromHex(Map["Linked_Authority_Id"].(string)); err == nil {
			al.Linked_Authority_Id = id
		}
	}
}
