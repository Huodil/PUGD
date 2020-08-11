package authorityModels

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UniformTitle struct {
	Id                     primitive.ObjectID       `json:"_id,omitempty" bson:"_id,omitempty"`
	Type                   int                      `json:"type"`
	Nature                 int                      `json:"nature"`
	Name                   string                   `json:"name"`
	Expression_Of          []map[string]interface{} `json:"expression_of"`
	Has_Expression         []map[string]interface{} `json:"has_expression"`
	Other_Links            []map[string]interface{} `json:"other_links"`
	Authors                []map[string]interface{} `json:"authors"`
	Interpreters           []map[string]interface{} `json:"interpreters"`
	Form_Text_Of_Work      string                   `json:"form_text_of_work"`
	Form_Of_Work_Id        int                      `json:"form_of_work_id"`
	Date_Of_Work           time.Time                `json:"date_of_work"`
	Original_Place_Of_Work string                   `json:"original_place_of_work"`
	Subject_Of_Work        string                   `json:"subject_of_work"`
	Targeted_Completeness  int                      `json:"targeted_completeness"`
	Targeted_Audience      string                   `json:"targeted_audience"`
	History_Of_Work        string                   `json:"history_of_work"`
	Medium_Of_Performance  []string                 `json:"medium_of_performance"`
	Numeric_Designation    []string                 `json:"numeric_designation"`
	Key_Text               string                   `json:"key_text"`
	Key_Id                 int                      `json:"key_id"`
	Coordinate_System      string                   `json:"coordinate_system"`
	Equinox                string                   `json:"equinox"`
	Form_Subdivision       []string                 `json:"form_subdivision"`
	Other_Features         string                   `json:"other_features"`
	Comment                string                   `json:"comment"`
	Url_Thumbnail          string                   `json:"url_thumbnail"`
	Linked_authorities     []primitive.ObjectID     `json:"linked_authorities"`
	Record                 []primitive.ObjectID     `json:"record"`
}
type ObjectWithDescription struct {
	object      primitive.ObjectID `json:"object"`
	description int                `json:"description"`
}

func (ut *UniformTitle) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("uniform_titles")
	result, errStoring := coll.InsertOne(ctx, ut)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (ut *UniformTitle) Update(CategoryUpdate bson.M) (int64, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("uniform_titles")

	result, err2 := coll.UpdateOne(ctx, bson.M{"_id": ut.Id},
		bson.M{
			"$set": CategoryUpdate,
		})
	if err2 != nil {
		return 0, errors.New(err2.Error())
	}
	return result.ModifiedCount, nil

}
func (ut *UniformTitle) FindMultiple(filter map[string]interface{}) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection("uniform_titles")
	LinkedAuthorityLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "authority_link"},
			{"localField", "linked_authorities"},
			{"foreignField", "_id"},
			{"as", "linked_authorities"}},
	}}
	//UnwindObjectedStage := bson.D{{"$unwind", bson.D{{"path", "$objected"}, {"preserveNullAndEmptyArrays", true}}}}
	//AddFieldsStage := bson.D{{"$addFields",
	//	bson.D{
	//		{"expression_of", bson.A{
	//		bson.D{
	//			{"description","$expression_of.description"},
	//			{"object","$objected"},
	//		},
	//		}},
	//	},
	//}}
	//UnsetObjected := bson.D{{"$unset", "objected"}}
	//GroupStage := bson.D{{"$group",
	//	bson.D{
	//		{"_id", "$_id"},
	//		{"expression_of", bson.D{{"$push","$expression_of"}}},
	//		{"ut", bson.D{{"$first","$$ROOT"}}},
	//	},
	//}}
	//ReplaceRoot := bson.D{{"$replaceRoot",
	//	bson.D{
	//		{"newRoot", bson.D{
	//				{"$mergeObjects",bson.A{
	//					"$ut",bson.D{{"expression_of","$expression_of"}},
	//				}},
	//		}},
	//	},
	//}}
	log.Println("filter", filter)

	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{
		bson.D{
			{"$match", filter},
		},
		LinkedAuthorityLookupStage,
		//UnwindExpressionOfStage,*****
		//ExpressionOfLookupStage,*******
		//UnwindObjectedStage,*********
		//AddFieldsStage,
		//UnsetObjected,
		//UnwindExpressionOfStage,
		//GroupStage,
		//ReplaceRoot,
		//unwind("expression_of"),
		//lookUp("from","expression_of.object","_id","objected"),
		//unwind("objected"),
	})

	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal("fatal", err)
			return nil, nil
		}
	}
	var results []bson.M
	//var results []*UniformTitle
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal(err)
	}
	fmt.Println(results)
	return results, nil
}

func unwind(FieldName string) bson.D {
	UnwindStage := bson.D{{"$unwind", bson.D{{"path", "$" + FieldName}, {"preserveNullAndEmptyArrays", true}}}}
	return UnwindStage
}
func lookUp(from string, localField string, foreignField string, as string) bson.D {
	ExpressionOfLookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", from},
			{"localField", localField},
			{"foreignField", foreignField},
			{"as", as}},
	}}
	return ExpressionOfLookupStage
}
