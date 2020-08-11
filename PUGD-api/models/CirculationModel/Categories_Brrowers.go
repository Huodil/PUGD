package CirculationModel

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"os"
	"time"
)

type CategoriesBrrowers struct {
	Id                     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	NameCategoriesBrrowers string             `json:"name" bson:"name_categories_brrowers"`
	DureeAdhesion          int                `json:"dureeadhesion" bson:"duree_adhesion"`
	AgeMin                 int                `json:"agemin" bson:"age_min"`
	AgeMax                 int                `json:"agemax" bson:"age_max"`
	//Brrowers     []string           `json:"Category"`
}

func (this CategoriesBrrowers) ToString() string {
	result := fmt.Sprintf("\nCategoriesBrrowers id: %s", this.Id.Hex())
	result = result + fmt.Sprintf("\nNameCategoriesBrrowers : %s", this.NameCategoriesBrrowers)
	result = result + fmt.Sprintf("\nDureeAdhesion : %v", this.DureeAdhesion)
	result = result + fmt.Sprintf("\nAgeMin : %v", this.AgeMin)
	result = result + fmt.Sprintf("\nAgeMax : %v", this.AgeMax)
	//result = result + fmt.Sprintf("\nCategory : %d \n", this.Category)
	return result
}

func (this *CategoriesBrrowers) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.CategoriesBorrowers))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (this CategoriesBrrowers) Find() *CategoriesBrrowers {
	filter := bson.M{
		"name_categories_brrowers": this.NameCategoriesBrrowers,
	}
	var categorie CategoriesBrrowers
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	err := models.DB.Collection(os.Getenv(db.CategoriesBorrowers)).FindOne(ctx, filter).Decode(&categorie)
	if err != nil {
		return nil
	}

	log.Print("Find----------\n ", categorie.ToString())
	return &categorie
}

func (this *CategoriesBrrowers) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.CategoriesBorrowers))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.Id},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}

func (*CategoriesBrrowers) FindOne(id primitive.ObjectID) (*CategoriesBrrowers, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	cat := &CategoriesBrrowers{}
	err := models.DB.Collection(os.Getenv(db.CategoriesBorrowers)).FindOne(ctx, bson.M{"_id": id}).Decode(cat)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}
	return cat, nil
}

func (this *CategoriesBrrowers) FindAllOrBy(filter bson.M) ([]*CategoriesBrrowers, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.CategoriesBorrowers))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, nil
		}
	}
	var results []*CategoriesBrrowers
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error CategoriesBrrowers -> FindAllOrBy \n Error ==>:", err)
	}
	log.Println("Length of Table Status: ", len(results))
	return results, nil
}
