package CirculationModel

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"os"
	"time"
)

type Relance struct {
	Id       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title    string             `json:"Title"`
	Level    string             `json:"Level"`
	Validity string             `json:"Validity"`
	//Category     []string           `json:"Category"`
}

// to String Reservation
func (this Relance) ToString() string {
	result := fmt.Sprintf("\nRelance id: %s", this.Id.Hex())
	result = result + fmt.Sprintf("\nTitle : %s", this.Title)
	result = result + fmt.Sprintf("\nLevel : %s", this.Level)
	result = result + fmt.Sprintf("\nValidity : %s", this.Validity)
	//result = result + fmt.Sprintf("\nCategory : %v", this.Category)
	return result
}

func (this *Relance) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Relances))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
