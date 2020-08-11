package AdministrationModels

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

type StatusBorrowers struct {
	Id                                  primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name                                string             `json:"status_name" bson:"status_name"`
	IsAutorizedForLoan                  bool               `json:"is_autorized_for_loan" bson:"is_autorized_for_loan"`
	IsAutorizedForBorrowerd             bool               `json:"is_autorized_for_borrowerd" bson:"is_autorized_for_borrowerd"`
	IsAutorizedForHistoriquePret        bool               `json:"is_autorized_for_historique_pret" bson:"is_autorized_for_historique_pret"`
	IsAutorizedForReservation           bool               `json:"is_autorized_for_reservation" bson:"is_autorized_for_reservation"`
	IsAutorizedForConnectedOPAC         bool               `json:"is_autorized_for_connected_opac" bson:"is_autorized_for_connected_opac"`
	IsAutorizedForDSI                   bool               `json:"is_autorized_for_dsi" bson:"is_autorized_for_dsi"`
	IsAutorizedForDsiPrivat             bool               `json:"is_autorized_for_dsi_privat" bson:"is_autorized_for_dsi_privat"`
	IsAutorizedForSarche                bool               `json:"is_autorized_for_sarche" bson:"is_autorized_for_sarche"`
	IsAutorizedForAccessToListBorrowerd bool               `json:"is_autorized_for_access_to_list_borrowerd" bson:"is_autorized_for_access_to_list_borrowerd"`
	IsAutorizedForRequestProlongation   bool               `json:"is_autorized_for_request_prolongation" bson:"is_autorized_for_request_prolongation"`
	IsAutorizedForChangedPassword       bool               `json:"is_autorized_for_changed_password" bson:"is_autorized_for_changed_password"`
}

func (this StatusBorrowers) ToString() string {
	result := fmt.Sprintf("\nStatus id: %s", this.Id.Hex())
	result = result + fmt.Sprintf("\nstatus_name: %s", this.Name)
	result = result + fmt.Sprintf("\nIsAutorizedForBorrowerd : %v", this.IsAutorizedForBorrowerd)
	result = result + fmt.Sprintf("\nIsAutorizedForHistoriquePret : %v", this.IsAutorizedForHistoriquePret)
	result = result + fmt.Sprintf("\nIsAutorizedForReservation : %v", this.IsAutorizedForReservation)
	result = result + fmt.Sprintf("\nIsAutorizedForConnectedOPAC : %v", this.IsAutorizedForConnectedOPAC)
	result = result + fmt.Sprintf("\nIsAutorizedForDSI : %v", this.IsAutorizedForDSI)
	result = result + fmt.Sprintf("\nIsAutorizedForDsiPrivat : %v", this.IsAutorizedForDsiPrivat)
	result = result + fmt.Sprintf("\nIsAutorizedForSarche : %v", this.IsAutorizedForSarche)
	result = result + fmt.Sprintf("\nIsAutorizedForAccessToListBorrowerd : %v", this.IsAutorizedForAccessToListBorrowerd)
	result = result + fmt.Sprintf("\nIsAutorizedForRequestProlongation : %v", this.IsAutorizedForRequestProlongation)
	result = result + fmt.Sprintf("\nIsAutorizedForChangedPassword : %v", this.IsAutorizedForChangedPassword)
	return result
}

func (this *StatusBorrowers) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.StatusBorrowers))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}

func (this StatusBorrowers) Find() *StatusBorrowers {
	filter := bson.M{
		"status_name": this.Name,
	}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var status StatusBorrowers
	err := models.DB.Collection(os.Getenv(db.StatusBorrowers)).FindOne(ctx, filter).Decode(&status)
	if err != nil {
		return nil
	}

	log.Print("Find----------\n ", status.ToString())
	return &status
}
func (this *StatusBorrowers) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.StatusBorrowers))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.Id},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}

func (this *StatusBorrowers) FindAllOrBy(filter bson.M) ([]*StatusBorrowers, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.StatusBorrowers))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, nil
		}
	}
	var results []*StatusBorrowers
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error StatusBorrowersModel -> FindAllOrBy \n Error ==>:", err)
	}
	log.Println("Length of Table StatusBorrowers: ", len(results))
	return results, nil
}
func (*StatusBorrowers) FindStatusByID(id primitive.ObjectID) (*StatusBorrowers, error) {
	Status := &StatusBorrowers{}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	err := models.DB.Collection(os.Getenv(db.StatusBorrowers)).FindOne(ctx, bson.M{"_id": id}).Decode(Status)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}

	return Status, nil
}
