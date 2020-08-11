package authorityModels

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"time"
)

type Author struct {
	Id                 primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Author_Type        int                  `json:"author_type"`
	Name_Auth          string               `json:"name_auth"`
	IndexName_Auth     string               `json:"indexname_auth"`
	Year_Birth         int                  `json:"year_birth"`
	Year_Death         int                  `json:"year_death"`
	City_Auth          string               `json:"city_auth"`
	Note_Auth          string               `json:"note_auth"`
	Country_Auth       string               `json:"country_auth"`
	WebSite_Auth       string               `json:"website_auth"`
	ISNI_Auth          string               `json:"isni_auth"`
	Subdivision_Auth   string               `json:"subdivision_auth"`
	UrlThumbnail_Auth  string               `json:"urlthumbnail_auth"`
	Linked_authorities []primitive.ObjectID `json:"linked_authorities"`
}

func (a *Author) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("author")
	result, errStoring := coll.InsertOne(ctx, a)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (a *Author) Update(AuthorUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("author")

	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": a.Id},

		bson.M{
			"$set": AuthorUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}
func (a *Author) FindMultiple(filter bson.M, skip int, limit int) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("author")
	lookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "authority_link"},
			{"localField", "linked_authorities"},
			{"foreignField", "_id"},
			{"as", "linked_authoritiess"}},
	}}
	var pipeLine = []bson.D{}
	if(skip!=0){
		pipeLine= append(pipeLine,	bson.D{
			{"$skip", skip},
		} )
	}
	if(limit!=0){
		pipeLine= append(pipeLine,	bson.D{
			{"$limit", limit},
		} )
	}
	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{lookupStage,
		bson.D{
			{"$match", filter},
		},
	})
	//showLoadedCursor, err := episodesCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage})
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal("fatal", err)
			return nil, nil
		}
	}

	var results []bson.M
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal(err)
	}
	fmt.Println("sfsdf")
	fmt.Println(results)

	return results, nil
}

//func (a *Author) FindByAllFields(all_Fields string) ([]*Author, error) {
//	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
//	// Declare empty filter
//	filter := bson.A{}
//	// Loop over user properties
//	v := reflect.ValueOf(*a)
//	for i := 0; i < v.NumField(); i++ {
//		// Add filter for said property
//		if(v.Type().Field(i).Name!="Id"){
//			filter = append(filter, bson.D{{strings.ToLower( v.Type().Field(i).Name), primitive.Regex{Pattern: regexp.QuoteMeta(all_Fields), Options: ""}}})
//		}
//
//	}
//	coll := models.DB.Collection("author")
//	fmt.Println(filter)
//	cursor, err := coll.Find(ctx, bson.D{
//	{"$or", filter},
//	})
//	if err != nil {
//		if err == mongo.ErrNoDocuments {
//			log.Fatal("fatal", err)
//			return nil, nil
//		}
//
//	}
//	var results []*Author
//	if err = cursor.All(ctx, &results); err != nil {
//		log.Fatal(err)
//	}
//	return results, nil
//}
