package CatalogingModel

import (
	"context"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Branch struct {
	Id            primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	BranchName    string               `json:"branchName"`
	BranchZip     int                  `json:"branchZip"`
	BranchCity    string               `json:"branchCity"`
	BranchState   string               `json:"branchState"`
	BranchCountry string               `json:"branchCountry"`
	BranchFax     string               `json:"BranchFax"`
	BranchPhone   string               `json:"BranchPhone"`
	BranchUrl     string               `json:"BranchUrl"`
	BranchIp      string               `json:"BranchIp"`
	GeoLocation   string               `json:"GeoLocation"`
	Records       []primitive.ObjectID `json:"records"`
	Serials       []primitive.ObjectID `json:"serials"`
	Library       primitive.ObjectID   `json:"library"`
}

// find one Record by Id ,
func FindBranchByID(id primitive.ObjectID) (*Branch, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	branch := &Branch{}
	filter := bson.M{}
	filter["_id"] = id
	err := models.DB.Collection("branches").FindOne(ctx, filter).Decode(branch)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}

	log.Print(branch)
	return branch, nil
}
