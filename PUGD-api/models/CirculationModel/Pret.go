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

// Many to Many (Borrowers--> Record)
type Prolongement struct {
	NombreMax        int       `json:"nombre_max"  bson:"nombre_max_prolongement"`
	DateProlongement time.Time `json:"date_prolongement"  bson:"date_prolongement"`
}
type Pret struct {
	Id             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	IdCopy         primitive.ObjectID `json:"idcopy" bson:"idcopy"`
	Idborrower     primitive.ObjectID `json:"idborrower" bson:"idborrower"` // Borrowers
	DatePret       time.Time          `json:"date_of_loan" bson:"date_of_loan"`
	DateRetourPrev time.Time          `json:"date_retour_prev" bson:"date_retour_prev"`
	IsPreted       bool               `json:"is_preted"  bson:"is_preted"`
	IsExpress      bool               `json:"is_Express"  bson:"is_Express"`
	Prologement    Prolongement       `json:"prologement" bson:"prologement"`
}

// to String Reservation
func (this Pret) ToString() string {
	result := fmt.Sprintf("\nPret id: %s", this.Id.Hex())
	result = result + fmt.Sprintf("\nIdCopy : %s", this.IdCopy)
	result = result + fmt.Sprintf("\nIdborrower : %s", this.Idborrower)
	result = result + fmt.Sprintf("\nDatePret : %s", this.DatePret)
	result = result + fmt.Sprintf("\nIsPreted : %v", this.IsPreted)
	result = result + fmt.Sprintf("\nDateRetourPrev : %v", this.DateRetourPrev)
	result = result + fmt.Sprintf("\nDateProlongement: %d \n", this.Prologement.DateProlongement)
	result = result + fmt.Sprintf("\nNombreMax: %d \n", this.Prologement.NombreMax)
	return result
}

func (this *Pret) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Pret))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
func (this Pret) Find() *Pret {
	filter := bson.M{
		"idcopy":     this.IdCopy,
		"idborrower": this.Idborrower,
		"is_preted":  true,
	}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var existe Pret
	err := models.DB.Collection(os.Getenv(db.Pret)).FindOne(ctx, filter).Decode(&existe)
	if err != nil {
		return nil
	}
	return &existe
}
func (this Pret) CurrentLoan() *Pret {
	filter := bson.M{
		"idcopy":    this.IdCopy,
		"is_preted": true,
	}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var existe Pret
	err := models.DB.Collection(os.Getenv(db.Pret)).FindOne(ctx, filter).Decode(&existe)
	if err != nil {
		return nil
	}
	return &existe
}

func (this *Pret) FindPretByAnyProprieties(filter bson.M) ([]*Pret, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Pret))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, err
		}
	}
	var results []*Pret
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Pret -> FindPretByAnyProprieties \n Error ==>:", err)
	}
	log.Println("Length of Table Pret have : ", len(results))
	return results, err
}

func (this *Pret) FindOneByProprietry(filter bson.M) (*Pret, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	pret := &Pret{}
	err := models.DB.Collection(os.Getenv(db.Pret)).FindOne(ctx, filter).Decode(pret)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, err
		}
	}
	log.Print("pret is ==== \n ", pret.ToString())
	return pret, nil
}

func (this *Pret) FindOne(id primitive.ObjectID) (*Pret, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	pret := &Pret{}
	f := bson.M{}
	f["_id"] = id
	err := models.DB.Collection(os.Getenv(db.Pret)).FindOne(ctx, f).Decode(pret)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}
	log.Print("pret is ==== \n ", pret.ToString())
	return pret, nil
}
func (this *Pret) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Pret))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.Id},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}

func (*Pret) TotalLoan(filter bson.M) int {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Reservations))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return 0
		}
	}
	var results []*Reservation
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Reservation -> FindTotalReservationForCopy \n Error ==>:", err)
	}
	log.Println("Length of Table Borrowers: ", len(results))
	return len(results)
}
