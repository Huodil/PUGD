package utils

import (
	"context"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// update a branch using a filter
func UpdateBranchIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("branches")
	branchUpdate := bson.M{}
	branchUpdate[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": branchUpdate,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a language using a filter
func UpdateLanguageIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("languages")
	LanguageUpdate := bson.M{}
	LanguageUpdate[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": LanguageUpdate,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a keyword using a filter
func UpdateKeyWordIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("keywords")
	KeyWordUpdate := bson.M{}
	KeyWordUpdate[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": KeyWordUpdate,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a serial using a filter
func UpdateSerialIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("serials")
	serialsUpdate := bson.M{}
	serialsUpdate[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": serialsUpdate,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a record using a filter
func UpdateRecordIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("records")
	RecordUpdate := bson.M{}
	RecordUpdate[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": RecordUpdate,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a category using a filter
func UpdateCategoryIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("category")
	CategoryUpdate := bson.M{}
	CategoryUpdate[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": CategoryUpdate,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a class number using a filter
func UpdateClassNumberIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("class_number")
	class_numberUpdate := bson.M{}
	class_numberUpdate[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": class_numberUpdate,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a Publisher using a filter
func UpdatePublisherIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("publisher")
	publisher := bson.M{}
	publisher[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": publisher,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a serie using a filter
func UpdateSerieIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("series")
	series := bson.M{}
	series[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": series,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a SubSerie using a filter
func UpdateSubSerieIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("sub_series")
	SubSerie := bson.M{}
	SubSerie[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": SubSerie,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}

// update a UniformTitle using a filter
func UpdateUniformTitleIDs(id primitive.ObjectID, filter string, value []primitive.ObjectID) bool {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll2 := models.DB.Collection("uniform_titles")
	UniformTitle := bson.M{}
	UniformTitle[filter] = value
	_, err2 := coll2.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{
			"$set": UniformTitle,
		})
	if err2 != nil {
		log.Fatal(err2)
		return false
	}
	return true
}
