package CirculationMutation

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"os"
	"time"
)

var InsertOneBorrower = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"bar_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"first_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"last_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"profession": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"birth_day": &graphql.ArgumentConfig{
			Type: graphql.DateTime,
		},
		"gender": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"phone_number": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"email": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		/*"statues": &graphql.ArgumentConfig{
			Type: graphql.String,
		},*/
		// address
		"ru1": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"ru2": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"city": &graphql.ArgumentConfig{ // vill
			Type: graphql.String,
		},
		"contry": &graphql.ArgumentConfig{ // payes
			Type: graphql.String,
		},

		// opac information
		"username_opac": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"password_opac": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"lang_opac": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		// send
		"message": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"comment": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		// Abonement
		"member_ship_start": &graphql.ArgumentConfig{
			Type: graphql.DateTime,
		},
		// add to
		"localisation": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"idCategoriesBorrowers": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"idStatusborrowes": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"groupsBorrowers": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"static_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		borrower := CirculationModel.Borrower{}

		if Barcode := p.Args["bar_code"]; Barcode != nil {
			borrower.Barcode = Barcode.(string)
		}
		if FirstName := p.Args["first_name"]; FirstName != nil {
			borrower.Firstname = FirstName.(string)
		}
		if LastName := p.Args["last_name"]; LastName != nil {
			borrower.Lastname = LastName.(string)
		}
		if profession := p.Args["profession"]; profession != nil {
			borrower.Profession = profession.(string)
		}
		if BirthDay := p.Args["birth_day"]; BirthDay != nil {
			borrower.BirthDay = BirthDay.(time.Time)
		}
		if Gender := p.Args["gender"]; Gender != nil {
			borrower.Gender = Gender.(string)
		}
		if PhoneNumber := p.Args["phone_number"]; PhoneNumber != nil {
			borrower.PhoneNumber = PhoneNumber.(string)
		}

		if Email := p.Args["email"]; Email != nil {
			borrower.Email = Email.(string)
		}
		/*if Statues := p.Args["Statues"]; Statues != nil {
			borrower.Statues = Statues.(string)
		}*/

		// Adress
		if Contry := p.Args["contry"]; Contry != nil {
			borrower.Address.Contry = Contry.(string)
		}
		if City := p.Args["city"]; City != nil {
			borrower.Address.City = City.(string)
		}
		if Rue1 := p.Args["ru1"]; Rue1 != nil {
			borrower.Address.Rue1 = Rue1.(string)
		}
		if Rue2 := p.Args["ru2"]; Rue2 != nil {
			borrower.Address.Rue2 = Rue2.(string)
		}
		// OPAC information connection
		if usernameOpac := p.Args["username_opac"]; usernameOpac != nil {
			borrower.UsernameOpac = usernameOpac.(string)
		}
		if passwordOpac := p.Args["password_opac"]; passwordOpac != nil {
			borrower.PasswordOpac = passwordOpac.(string)
		}
		if langOpac := p.Args["lang_opac"]; langOpac != nil {
			borrower.LangOpac = langOpac.(string)
		}

		// send

		if Message := p.Args["message"]; Message != nil {
			borrower.Message = Message.(string)
		}
		if Comment := p.Args["comment"]; Comment != nil {
			borrower.Comment = Comment.(string)
		}
		// Membership ( Abonnement ou Adherssion
		if MembershipStart := p.Args["member_ship_start"]; MembershipStart != nil {
			borrower.MembershipStart = MembershipStart.(time.Time)
		}

		// todo use function to calcul cancaled membership
		if MembershipCanceled := p.Args["MembershipCanceled"]; MembershipCanceled != nil {
			borrower.MembershipCanceled = MembershipCanceled.(time.Time)
		}

		// Localistation: == Library  like : PMB-Service ...
		if p.Args["localisation"] != nil {
			id, err := primitive.ObjectIDFromHex(p.Args["localisation"].(string))
			if err == nil {
				borrower.IdLibrary = id
			}
		}
		// Localistation: == Library
		if p.Args["idStatusborrowes"] != nil {
			id, err := primitive.ObjectIDFromHex(p.Args["idStatusborrowes"].(string))
			if err == nil {
				borrower.StatusBorrowers = id
			}
		}
		if p.Args["idCategoriesBorrowers"] != nil {
			id, err := primitive.ObjectIDFromHex(p.Args["idCategoriesBorrowers"].(string))
			if err == nil {
				borrower.IdCategoriesBorrowers = id
			}
		}

		if p.Args["static_code"] != nil {
			id, err := primitive.ObjectIDFromHex(p.Args["static_code"].(string))
			if err == nil {
				borrower.StaticCode = id
			}
		}
		/*if p.Args["GroupsBr"] != nil {
			id, err := primitive.ObjectIDFromHex(p.Args["GroupsBr"].(string))
			if err == nil {
				borrower.IdCategoriesBorrowers = id
			}
		}*/
		// todo add groupes borrowers
		if GroupesBr := p.Args["groupsBorrowers"]; GroupesBr != nil {

			// convert the list to an interface array
			GroperList := GroupesBr.([]interface{})
			// the resulting array
			borrower.IdGroupsBorrowers = utils.MakeSliceOfIDs(GroperList)
			/*var ObjectIdList []primitive.ObjectID
			for i := 0; i < len(GroperList); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(GroperList[i].(string))
				if err != nil {
					return nil, err
				}
				ObjectIdList = append(ObjectIdList, _id)
			}
			borrower.IdGroupsBorrowers = ObjectIdList*/
		}

		// check code_bar
		borrowerExists := borrower.Find()
		if borrowerExists != nil {
			return nil, errors.New("borrower already exists")
		}

		lastId, errInsertGroup := borrower.Store()
		if errInsertGroup != nil {
			log.Fatal("error inserting borrowers --> ", errInsertGroup)
		}
		fmt.Println(lastId.Hex())
		return lastId.Hex(), nil
	},
}

// usage
// {
// 	updateOneBook(
// 	  _id:"5e55229a25734e189a79aff5"
// 	  id:"zzuuuzzz",
// 	  isbn:"uuuu" )
// 	}

var UpdateOneBorrower = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"bar_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"first_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"last_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"profession": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"birth_day": &graphql.ArgumentConfig{
			Type: graphql.DateTime,
		},
		"gender": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"phone_number": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"email": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		//"statues": &graphql.ArgumentConfig{
		//	Type: graphql.String,
		//},
		// address
		"ru1": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"ru2": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"city": &graphql.ArgumentConfig{ // vill
			Type: graphql.String,
		},
		"contry": &graphql.ArgumentConfig{ // payes
			Type: graphql.String,
		},

		// opac information
		"username_opac": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"password_opac": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"lang_opac": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		// send
		"message": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"comment": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		// Abonement
		"member_ship_start": &graphql.ArgumentConfig{
			Type: graphql.DateTime,
		},
		// add to
		"communes": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"categories_borrowers": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"static_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"GroupsBr": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		Updateborrower := bson.M{}
		borrower := CirculationModel.Borrower{}

		if Barcode := p.Args["bar_code"]; Barcode != nil {
			Updateborrower["bar_code"] = Barcode.(string)
		}
		if FirstName := p.Args["first_name"]; FirstName != nil {
			Updateborrower["first_name"] = FirstName.(string)
		}
		if LastName := p.Args["last_name"]; LastName != nil {
			Updateborrower["last_name"] = LastName.(string)
		}
		if Profession := p.Args["profession"]; Profession != nil {
			Updateborrower["profession"] = Profession.(string)
		}
		if BirthDay := p.Args["birth_day"]; BirthDay != nil {
			Updateborrower["birth_day"] = BirthDay.(time.Time)
		}
		if Gender := p.Args["gender"]; Gender != nil {
			Updateborrower["gender"] = Gender.(string)
		}
		if PhoneNumber := p.Args["phone_number"]; PhoneNumber != nil {
			Updateborrower["phone_number"] = PhoneNumber.(string)
		}

		if Email := p.Args["email"]; Email != nil {
			Updateborrower["email"] = Email.(string)
		}
		/*if Statues := p.Args["Statues"]; Statues != nil {
			Updateborrower["Statues"] = Statues.(string)
		}*/

		// Adress
		if Contry := p.Args["contry"]; Contry != nil {
			Updateborrower["address.contry"] = Contry.(string)

		}
		if City := p.Args["city"]; City != nil {
			Updateborrower["address.city"] = City.(string)
		}
		if Rue1 := p.Args["ru1"]; Rue1 != nil {
			Updateborrower["address.rue1"] = Rue1.(string)
		}
		if Rue2 := p.Args["ru2"]; Rue2 != nil {
			Updateborrower["address.rue2"] = Rue2.(string)
		}
		// OPAC information connection
		if usernameOpac := p.Args["username_opac"]; usernameOpac != nil {
			Updateborrower["username_opac"] = usernameOpac.(string)
		}
		if passwordOpac := p.Args["password_opac"]; passwordOpac != nil {
			Updateborrower["password_opac"] = passwordOpac.(string)
		}
		if langOpac := p.Args["lang_opac"]; langOpac != nil {
			Updateborrower["lang_opac"] = langOpac.(string)
		}

		// send

		if Message := p.Args["message"]; Message != nil {
			Updateborrower["message"] = Message.(string)
		}
		if Comment := p.Args["comment"]; Comment != nil {
			Updateborrower["comment"] = Comment.(string)
		}
		// Membership ( Abonnement ou Adherssion
		if MembershipStart := p.Args["member_ship_start"]; MembershipStart != nil {
			Updateborrower["member_ship_start"] = MembershipStart.(time.Time)
		}

		// todo use function to calcul cancaled membership
		if MembershipCanceled := p.Args["MembershipCanceled"]; MembershipCanceled != nil {
			Updateborrower["MembershipCanceled"] = MembershipCanceled.(time.Time)
		}

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, errors.New("Error to convert id status to HEX")
		}
		borrower.Id = _id

		// Add to

		if p.Args["communes"] != nil {
			communesId, err2 := primitive.ObjectIDFromHex(p.Args["communes"].(string))
			if err2 != nil {
				log.Println("pas de cmommues")
			}
			Updateborrower["id_communes"] = communesId
		}

		if p.Args["categories_borrowers"] != nil {
			idCategoriesBorrowers, err := primitive.ObjectIDFromHex(p.Args["categories_borrowers"].(string))
			if err == nil {
				Updateborrower["categories_borrowers"] = idCategoriesBorrowers
			}
		}
		if p.Args["static_code"] != nil {
			StaticCode, err := primitive.ObjectIDFromHex(p.Args["static_code"].(string))
			if err == nil {
				Updateborrower["static_code"] = StaticCode
			}
		}
		if p.Args["GroupsBr"] != nil {
			id, err := primitive.ObjectIDFromHex(p.Args["GroupsBr"].(string))
			if err == nil {
				Updateborrower["groups_borrowers"] = id
			}
		}
		return borrower.Update(Updateborrower)
	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneBorrower = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Borrowers))

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
