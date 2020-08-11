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

// emprenteur -> lecteur -> Boorower

type Address struct {
	Rue1   string `json:"rue1" bson:"rue1"`
	Rue2   string `json:"rue2" bson:"rue2"`
	City   string `json:"city" bson:"city"`
	Contry string `json:"contry" bson:"contry"`
}

type Borrower struct {
	Id          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Firstname   string             `json:"first_name" bson:"first_name"`
	Lastname    string             `json:"last_name" bson:"last_name"`
	Profession  string             `json:"profession" bson:"profession"`
	Barcode     string             `json:"bar_code" bson:"bar_code"`
	PhoneNumber string             `json:"phone_number" bson:"phone_number"`
	BirthDay    time.Time          `json:"dirthday" bson:"dirth_day"`
	Email       string             `json:"email"`
	Gender      string             `json:"gender"`
	Statues     string             `json:"statues"` // todo status ?
	//
	Address Address `json:"address" bson:"address"`
	// OPAC
	UsernameOpac string `json:"username_opac" bson:"username_opac"`
	PasswordOpac string `json:"password_opac" bson:"password_opac"`
	LangOpac     string `json:"lang_opac" bson:"lang_opac"`
	// duré d'Abonement ou Adhession
	MembershipStart    time.Time `json:"membershipstart" bson:"member_ship_start"`
	MembershipCanceled time.Time `json:"membershipcanceled" bson:"member_ship_canceled"`

	// Send
	Message string `json:"message"`
	Comment string `json:"comment"`
	// add to
	IdCategoriesBorrowers primitive.ObjectID   `json:"categories" bson:"categories_borrowers"`
	IdLibrary             primitive.ObjectID   `json:"localisation" bson:"localisation"`
	IdGroupsBorrowers     []primitive.ObjectID `json:"groups" bson:"groups_borrowers"`
	StatusBorrowers       primitive.ObjectID   `json:"status_borrowers" bson:"status_borrowers"`
	StaticCode            primitive.ObjectID   `json:"static_code" bson:"static_code"`
}

//To String

func (this Borrower) ToString() string {
	result := fmt.Sprintf("\nBorrower id: %s", this.Id.Hex())
	result = result + fmt.Sprintf("\nFull name: %s", this.Firstname+" "+this.Lastname)
	result = result + fmt.Sprintf("\nBarcode : %s", this.Barcode)
	result = result + fmt.Sprintf("\nAddress : %s", this.Address)
	result = result + fmt.Sprintf("\nPhoneNumber : %s", this.PhoneNumber)
	result = result + fmt.Sprintf("\nBirthDay : %s", this.BirthDay)
	result = result + fmt.Sprintf("\nEmail : %s", this.Email)
	result = result + fmt.Sprintf("\nGender : %s", this.Gender)
	result = result + fmt.Sprintf("\nStatues : %s", this.Statues)
	result = result + fmt.Sprintf("\nUsernameOpac : %s", this.UsernameOpac)
	result = result + fmt.Sprintf("\nPasswordOpac : %s", this.PasswordOpac)
	result = result + fmt.Sprintf("\nLangOpac : %s", this.LangOpac)
	result = result + fmt.Sprintf("\nMembershipStart : %s", this.MembershipStart)
	result = result + fmt.Sprintf("\nMembershipCanceled : %s", this.MembershipCanceled)
	result = result + fmt.Sprintf("\nIdCatBr : %s", this.IdCategoriesBorrowers.Hex())
	for i, s := range this.IdGroupsBorrowers {
		result = result + fmt.Sprintf("Group :%d, %s", i, s)
	}
	return result
}

func (this *Borrower) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Borrowers))

	result, errStoring := coll.InsertOne(ctx, this)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}

func (this Borrower) Find() *Borrower {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	filter := bson.M{
		"bar_code": this.Barcode,
	}
	var borrower Borrower
	err := models.DB.Collection(os.Getenv(db.Borrowers)).FindOne(ctx, filter).Decode(&borrower)
	if err != nil {
		return nil
	}
	return &borrower
}

// find Multipel Borrowers
func (a *Borrower) FindBy(filter bson.D) ([]*Borrower, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Borrowers))
	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{filter})
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal("fatal", err)
			return nil, nil
		}
	}
	var results []*Borrower
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal(err)
	}
	return results, nil
}

// find one Borrowers by Id ,
func (this *Borrower) FindOne(id primitive.ObjectID) (*Borrower, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	borrower := &Borrower{}
	err := models.DB.Collection(os.Getenv(db.Borrowers)).FindOne(ctx, bson.M{"_id": id}).Decode(borrower)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Print(err)
			return nil, err
		}
	}
	return borrower, nil
}

func FindBorrowersByAnyProprieties(filter bson.M) ([]*Borrower, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Borrowers))
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Fatal(err)
			return nil, nil
		}
	}
	var results []*Borrower
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal("error Borrower -> FindBorrowersByAnyProprieties \n Error ==>:", err)
	}
	return results, nil
}

func (this *Borrower) Update(modelUpdate bson.M) (int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Borrowers))

	result, err := coll.UpdateOne(ctx, bson.M{"_id": this.Id},
		bson.M{
			"$set": modelUpdate,
		})
	if err != nil {
		return 0, errors.New(err.Error())
	}
	return result.ModifiedCount, nil

}
