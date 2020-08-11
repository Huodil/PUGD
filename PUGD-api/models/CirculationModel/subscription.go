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

type Subscription struct {
	Id          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	DateSub     string             `json:"DateSub "`
	CodeSub     string             `json:"CodeSub"`
	DateEnd     string             `json:"DateEnd"`
	Periodicity string             `json:"Periodicity"`
	//Category     []string           `json:"Category"`
}

// to String Reservation
func (this Subscription) ToString() string {
	result := fmt.Sprintf("\nReservation id: %s", this.Id.Hex())
	result = result + fmt.Sprintf("\nDateSub : %s", this.DateSub)
	result = result + fmt.Sprintf("\nCodeSub : %s", this.CodeSub)
	result = result + fmt.Sprintf("\nDateEnd : %s", this.DateEnd)
	result = result + fmt.Sprintf("\nPeriodicity : %v", this.Periodicity)
	//result = result + fmt.Sprintf("\nCategory : %d \n", this.Category)
	return result
}

func (this *Subscription) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Subscriptions))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
