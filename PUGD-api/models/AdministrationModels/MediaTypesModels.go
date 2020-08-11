package AdministrationModels

import (
	"context"
	"errors"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MediaTypes struct {
	ID                primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name              string             `json:"media_types_name" bson:"media_types_name"`
	DurePret          int                `json:"dure_pret" bson:"dure_pret"`
	DureReservation   int                `json:"dure_reservation" bson:"dure_reservation"`
	InternationalCode string             `json:"international_code" bson:"international_code"`
	OwenId            primitive.ObjectID `json:"owen" bson:"owen"`
}

func (this *MediaTypes) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.MediaTypes))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}

func (this MediaTypes) Find() *MediaTypes {

	//todo Custom Filter
	filter := bson.M{
		"media_types_name":   this.Name,
		"international_code": this.InternationalCode,
	}
	var media MediaTypes
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	err := models.DB.Collection(os.Getenv(db.MediaTypes)).FindOne(ctx, filter).Decode(&media)
	if err != nil {
		return nil
	}

	return &media
}
func (this *MediaTypes) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.MediaTypes))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.ID},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}

func (this *MediaTypes) FindAllOrBy(filter bson.M) ([]*MediaTypes, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.MediaTypes))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, nil
		}
	}
	var results []*MediaTypes
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Status -> FindAllOrBy \n Error ==>:", err)
	}
	log.Println("Length of Table Status: ", len(results))
	return results, nil
}
func (*MediaTypes) FindMediaTypeByID(id primitive.ObjectID) (*MediaTypes, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	MediaType := &MediaTypes{}
	err := models.DB.Collection(os.Getenv(db.MediaTypes)).FindOne(ctx, bson.M{"_id": id}).Decode(MediaType)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}
	return MediaType, nil
}
