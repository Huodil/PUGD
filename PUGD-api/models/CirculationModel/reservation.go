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
type Reservation struct {
	Id               primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	IdCopy           primitive.ObjectID `json:"id_Copy"`
	Idborrower       primitive.ObjectID `json:"idborrower"` // Borrowers
	DateConfirmation time.Time          `json:"date_confirmation" bson:"date_confirmation"`
	DateRetour       time.Time          `json:"date_retour" bson:"date_retour"`
	Checked          bool               `json:"checked"`
	Confirmed        bool               `json:"confirmed"`
	Rank             int                `json:"rank"`
}

// to String Reservation
func (this Reservation) ToString() string {
	result := fmt.Sprintf("ToString : \nReservation id: %s", this.Id.Hex())
	result = result + fmt.Sprintf("\nIdRecord : %s", this.IdCopy)
	result = result + fmt.Sprintf("\nIdborrower : %s", this.Idborrower)
	result = result + fmt.Sprintf("\nDateConfirmation : %s", this.DateConfirmation)
	result = result + fmt.Sprintf("\nDateRetour : %s", this.DateRetour)
	result = result + fmt.Sprintf("\nConfirmed : %v", this.Confirmed)
	result = result + fmt.Sprintf("\nRank : %d \n", this.Rank)
	return result
}

func (this *Reservation) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Reservations))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}

func (this Reservation) Find() *Reservation {
	filter := bson.M{
		"_id": this.Id,
	}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var reservation Reservation
	err := models.DB.Collection(os.Getenv(db.Reservations)).FindOne(ctx, filter).Decode(&reservation)
	if err != nil {
		return nil
	}
	return &reservation
}

func (*Reservation) FindTotalReservationForCopy(filter bson.M) int {
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

func (this *Reservation) FindAllOrBy(filter bson.M) ([]*Reservation, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Reservations))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print("---> \n", err)
			return nil, nil
		}
	}
	var results []*Reservation
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Status -> FindAllOrBy \n Error ==>:", err)
	}
	log.Println("Length of Table Status: ", len(results))
	return results, nil
}

func (this *Reservation) FindOne(filter bson.M) (*Reservation, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var reservation Reservation
	err := models.DB.Collection(os.Getenv(db.Reservations)).FindOne(ctx, filter).Decode(&reservation)
	if err != nil {
		return nil, errors.New("no reservation correspondant")
	}
	return &reservation, nil
}

func (this *Reservation) FindMan(f bson.M) ([]bson.M, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Reservations))
	//  opts := options.Find().SetSort(bson.D{{"age", 1}})
	//cursor, err := coll.Find(ctx, filter)
	lookupStage := bson.D{{"$lookup",
		bson.D{
			{"from", "Reservations"},
			{"localField", "groupsbr"},
			{"foreignField", "_id"},
			{"as", "groupsBorrowers"}},
	}}
	//unwindStage := bson.D{{"$unwind", bson.D{{"path", "$linked_authoritiess"}, {"preserveNullAndEmptyArrays", false}}}}

	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{lookupStage})
	//showLoadedCursor, err := episodesCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage})
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal("fatal", err)
			return nil, nil
		}
	}

	//var results []*Author
	var results []bson.M
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal(err)
	}

	//fmt.Println(results)

	return results, nil
}

func (this *Reservation) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Reservations))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.Id},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	log.Println("upda: ", result.ModifiedCount)
	return result.ModifiedCount, nil

}

func (this *Reservation) UpdateAll(IdCopy primitive.ObjectID) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Reservations))

	filter := bson.D{{"confirmed", false}, {"idcopy", IdCopy}}
	update := bson.D{{"$inc", bson.D{{"rank", -1}}}}

	result, err := coll.UpdateMany(ctx, filter, update)
	if err != nil {
		log.Fatal(err)
	}
	if result.MatchedCount != 0 {
		fmt.Println("matched and replaced an existing document")

	}
	return result.MatchedCount, nil

}

func (this Reservation) CurrentReservation() *Reservation {
	filter := bson.M{
		"idcopy":     this.IdCopy,
		"idborrower": this.Idborrower,
		"confirmed":  false,
	}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var existe Reservation
	err := models.DB.Collection(os.Getenv(db.Reservations)).FindOne(ctx, filter).Decode(&existe)
	if err != nil {
		return nil
	}
	return &existe
}
