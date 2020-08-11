package CatalogingModel

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

// done Examplaire
type Copy struct {
	Id               primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	BareCode         string             `json:"barecode"`
	Price            float64            `json:"title"`
	ReplacementPrice float64            `json:"ReplacementPrice"`
	DateLastBorrowed string             `json:"DateLastBorroweed"`
	DateLastSeen     string             `json:"DateLastSeen"`
	Stack            string             `json:"Stack"`
	NoteForLoan      bool               `json:"NoteForLoan"`
	WithDrawn        bool               `json:"WithDrawn"`
	Reserves         int                `json:"Reserves"`
	Restricted       string             `json:"Restricted"`
	CopyNumber       int                `json:"CopyNumber"`
	NewStatus        string             `json:"NewStatus"`
	Cote             string             `json:"Cote"`
	Localisation     primitive.ObjectID `json:"Localisation"`
	MediaType        primitive.ObjectID `json:"MediaType"`
	Owner            primitive.ObjectID `json:"Owner"`
	Section          primitive.ObjectID `json:"Section"`
	Status           primitive.ObjectID `json:"Status"`
	CodeStatic       primitive.ObjectID `json:"CodeStatic"`
	Record           primitive.ObjectID `json:"Record"`
	LastLoan         primitive.ObjectID `json:"LastLoan"`
}

func (this Copy) ToString() string {
	result := fmt.Sprintf("\nCopies id: %s", this.Id.Hex())
	result = result + fmt.Sprintf("\nBare_Code : %s", this.BareCode)
	result = result + fmt.Sprintf("\nPrix : %v", this.Price)
	result = result + fmt.Sprintf("\nRecord : %s", this.Record.Hex())
	result = result + fmt.Sprintf("\nMediaType : %s", this.MediaType.Hex())
	result = result + fmt.Sprintf("\nSection : %s", this.Section.Hex())
	result = result + fmt.Sprintf("\nStatus : %s", this.Status.Hex())
	result = result + fmt.Sprintf("\nLastLoan : %s", this.LastLoan.Hex())

	return result
}

func (this *Copy) FindOneCopyByfilter(filter bson.M) (*Copy, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	cop := &Copy{}
	err := models.DB.Collection(os.Getenv(db.Copies)).FindOne(ctx, filter).Decode(cop)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}
	log.Print(cop.ToString())
	return cop, nil
}

// find one Record by Id ,
func (this *Copy) FindCopyByID(id primitive.ObjectID) (*Copy, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	copy := &Copy{}
	filter := bson.M{}
	filter["_id"] = id
	err := models.DB.Collection(os.Getenv(db.Copies)).FindOne(ctx, filter).Decode(copy)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Printf("in Find Copy by ID \n id : %v \n err :%v", id, err)
			//return nil, err
		}
	}

	log.Print(copy.ToString())
	return copy, nil
}

func (*Copy) FindManyCopy(filter bson.M) ([]*Copy, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Copies))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, nil
		}
	}
	var results []*Copy
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Copy -> FindManyCopy \n Error ==>:", err)
	}
	log.Println("FindManyCopy : ", len(results))
	return results, nil
}

func (this *Copy) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Copies))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.Id},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}
