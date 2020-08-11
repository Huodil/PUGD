package AdministrationModels

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Status struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name      string             `json:"status_name" bson:"status_name"`
	LabelOPAC string             `json:"label_opac" bson:"label_opac"`
	// peut il etre pret ?
	CanBorrowed bool `json:"can_borrowed" bson:"can_borrowed"`
	// peut il etre pret ?
	CanReserved   bool `json:"can_reserved" bson:"can_reserved"`
	VisibleInOPAC bool `json:"visible_in_opac" bson:"visible_in_opac"`
	// Internal code for imports
	InternationalCode string             `json:"international_code" bson:"international_code"`
	OwenId            primitive.ObjectID `json:"owen" bson:"owen"`
}

func (this Status) ToString() string {
	result := fmt.Sprintf("\nStatus id: %s", this.ID.Hex())
	result = result + fmt.Sprintf("\nstatus_name: %s", this.Name)
	result = result + fmt.Sprintf("\nlabel_opac : %s", this.LabelOPAC)
	result = result + fmt.Sprintf("\ncan_borrowed : %v", this.CanBorrowed)
	result = result + fmt.Sprintf("\ncan_reserved : %s", this.CanReserved)
	result = result + fmt.Sprintf("\nvisible_in_opac : %s", this.VisibleInOPAC)
	result = result + fmt.Sprintf("\ninternational_code : %s", this.InternationalCode)
	result = result + fmt.Sprintf("\nowen id : %s", this.OwenId)
	return result
}

func (this *Status) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Status))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}

func (this Status) Find() *Status {
	filter := bson.M{
		"status_name":        this.Name,
		"international_code": this.InternationalCode,
	}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var status Status
	err := models.DB.Collection(os.Getenv(db.Status)).FindOne(ctx, filter).Decode(&status)
	if err != nil {
		return nil
	}

	log.Print("Find----------\n ", status.ToString())
	return &status
}
func (this *Status) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Status))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.ID},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}

func (this *Status) FindAllOrBy(filter bson.M) ([]*Status, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Status))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, nil
		}
	}
	var results []*Status
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Status -> FindAllOrBy \n Error ==>:", err)
	}
	log.Println("Length of Table Status: ", len(results))
	return results, nil
}
func (*Status) FindStatusByID(id primitive.ObjectID) (*Status, error) {
	Status := &Status{}
	filter := bson.M{}
	filter["_id"] = id

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	err := models.DB.Collection(os.Getenv(db.Status)).FindOne(ctx, filter).Decode(Status)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}

	log.Print(Status)
	return Status, nil
}
