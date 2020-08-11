package CirculationModel

import (
	"context"
	"encoding/json"
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

/*
contient l'ensemble des lectuer ( emprenteur -> Borrowers)
**/

type Groups struct {
	Id                                   primitive.ObjectID   `json:"_id,omitempty"                            bson:"_id,omitempty"`
	CreatedAt                            time.Time            `json:"created_at"                               bson:"created_at"`
	NameGroup                            string               `json:"name"                                     bson:"name"`
	Message                              string               `json:"message"                                  bson:"message"`
	AddResponsableToGroup                bool                 `json:"add_responsable_to_group"                 bson:"add_responsable_to_group"`
	SendMailReservationToResponsable     bool                 `json:"mail_reservation"                         bson:"mail_reservation_to_responsable"`
	SendMailRappelToResponsable          bool                 `json:"mail_rappel"                              bson:"mail_rappel_to_responsable"`
	SendLetterRappelToResponsable        bool                 `json:"letter_rappel"                            bson:"letter_rappel_to_responsable"`
	SendLetterReservationToResponsable   bool                 `json:"letter_reservation"                       bson:"letter_reservation_to_responsable"`
	ImprimeNameGroupOneLetter            bool                 `json:"imprime_name_one_letter"                  bson:"imprime_name_group_one_letter"`
	ImprimeNameGroupOneLetterReservation bool                 `json:"imprime_name_one_letter_reservation"      bson:"imprime_name_group_one_letter_teservation"`
	BorrowersId                          primitive.ObjectID   `json:"borrower_id"                              bson:"borrower_id"` // Responsalbe Groups
	MembersBrrowers                      []primitive.ObjectID `json:"members"                                  bson:"members"`     // member de group
}

// to String Reservation
func (this Groups) ToString() string {
	result := fmt.Sprintf("\nGroups id: %s", this.Id.Hex())
	result = result + fmt.Sprintf("\nNameGroups : %s", this.NameGroup)
	result = result + fmt.Sprintf("\nmessage : %s", this.Message)
	result = result + fmt.Sprintf("\nCreatedAt : %s", this.CreatedAt)
	result = result + fmt.Sprintf("\nAddResponsableToGroup : %v", this.AddResponsableToGroup)
	result = result + fmt.Sprintf("\nid Responsable Group  : %v", this.BorrowersId)
	result = result + fmt.Sprintf("\nSendLetterRappelToResponsable : %v", this.SendLetterRappelToResponsable)
	result = result + fmt.Sprintf("\nsendMailReservationToResponsable : %v", this.SendMailReservationToResponsable)
	result = result + fmt.Sprintf("\nsendMailRappelToResponsable : %v", this.SendMailRappelToResponsable)
	result = result + fmt.Sprintf("\nSendLetterReservationToResponsable : %v", this.SendLetterReservationToResponsable)
	result = result + fmt.Sprintf("\nImprimeNameGroupOneLetter : %v", this.ImprimeNameGroupOneLetter)
	result = result + fmt.Sprintf("\nImprimeNameGroupOneLetterReservation : %v", this.ImprimeNameGroupOneLetterReservation)
	result = result + fmt.Sprintf("\nNombre de membre Groups : %v", len(this.MembersBrrowers))
	return result
}

func (this *Groups) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Groups))
	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}

func (c *Groups) FindAll() ([]*Groups, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Groups))

	lookupReservation := bson.D{{"$lookup", bson.D{
		{"from", "Borrowers"},
		{"localField", "borrower_id"},
		{"foreignField", "_id"},
		{"as", "responsable"},
	}}}

	gourp := bson.D{{
		"$group", bson.D{
			{"_id", 1},
			{"count", bson.D{{"$sum", 1}}},
			//{"listOfStudents", bson.D{{"$push", "$name"}}},
		}}}

	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{
		lookupReservation, gourp,
	})

	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, errors.New(err.Error())
		}
	}
	log.Print("\n")
	var showsWithInfo []bson.M
	if err = cursor.All(ctx, &showsWithInfo); err != nil {
		log.Print("err")
		panic(err)
	}

	b, err := json.MarshalIndent(showsWithInfo, "", " ")
	if err == nil {
		s := string(b)
		fmt.Println(s)
	}
	var results []*Groups
	if err = cursor.All(ctx, &results); err != nil {
		log.Print(err)
		return nil, errors.New(err.Error())
	}
	return results, nil
}

func (c *Groups) FindMany(filter bson.M) ([]*Groups, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Groups))

	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, errors.New(err.Error())
		}
	}
	var results []*Groups
	if err = cursor.All(ctx, &results); err != nil {
		log.Print(err)
		return nil, errors.New(err.Error())
	}
	return results, nil
}

func (this Groups) FindOnes(filter bson.M) (*Groups, error) {
	var groups Groups
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	err := models.DB.Collection(os.Getenv(db.Groups)).FindOne(ctx, filter).Decode(&groups)
	if err != nil {
		return nil, err
	}
	log.Print("Find----------\n ", groups.ToString())
	return &groups, nil
}

// find one Borrowers by Id ,
func (c *Groups) FindOne(id primitive.ObjectID) (*Groups, error) {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	bor := &Groups{}
	f := bson.M{}
	f["_id"] = id
	err := models.DB.Collection(os.Getenv(db.Groups)).FindOne(ctx, f).Decode(bor)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}

	log.Print(bor)
	return bor, nil
}

func (this *Groups) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Groups))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.Id},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}
