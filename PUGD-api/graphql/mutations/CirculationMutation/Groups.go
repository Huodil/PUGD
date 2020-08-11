package CirculationMutation

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"os"
	"time"
)

var InsertOneGroup = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"message": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"responsable": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"addResponsableToGroup": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"sendMailReservationToResponsable": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"sendMailRappelToResponsable": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"sendLetterRappelToResponsable": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"sendLetterReservationToResponsable": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"imprimeNameGroupOneLetter": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"imprimeNameGroupOneLetterReservation": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},

		"members": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		groups := CirculationModel.Groups{}
		groups.CreatedAt = time.Now()
		log.Print("hello")

		if name := p.Args["name"]; name != nil {
			groups.NameGroup = name.(string)
		}
		if message := p.Args["message"]; message != nil {
			groups.Message = message.(string)
		}

		addResponsableToGroup := p.Args["addResponsableToGroup"]
		if addResponsableToGroup != nil {
			groups.AddResponsableToGroup = addResponsableToGroup.(bool)
		}

		Responsable := p.Args["responsable"].(string)

		if sendMailReservationToResponsable := p.Args["sendMailReservationToResponsable"]; sendMailReservationToResponsable != nil {
			groups.SendMailReservationToResponsable = sendMailReservationToResponsable.(bool)
		}
		if sendMailRappelToResponsable := p.Args["sendMailRappelToResponsable"]; sendMailRappelToResponsable != nil {
			groups.SendMailRappelToResponsable = sendMailRappelToResponsable.(bool)
		}
		if sendLetterRappelToResponsable := p.Args["sendLetterRappelToResponsable"]; sendLetterRappelToResponsable != nil {
			groups.SendLetterRappelToResponsable = sendLetterRappelToResponsable.(bool)
		}
		if sendLetterReservationToResponsable := p.Args["sendLetterReservationToResponsable"]; sendLetterReservationToResponsable != nil {
			groups.SendLetterReservationToResponsable = sendLetterReservationToResponsable.(bool)
		}
		if imprimeNameGroupOneLetter := p.Args["imprimeNameGroupOneLetter"]; imprimeNameGroupOneLetter != nil {
			groups.ImprimeNameGroupOneLetter = imprimeNameGroupOneLetter.(bool)
		}
		if imprimeNameGroupOneLetterReservation := p.Args["imprimeNameGroupOneLetterReservation"]; imprimeNameGroupOneLetterReservation != nil {
			groups.ImprimeNameGroupOneLetterReservation = imprimeNameGroupOneLetterReservation.(bool)
		}

		// todo add Members
		MembersBrrowers := p.Args["members"]
		var ObjectIdList []primitive.ObjectID

		if Responsable != "" {
			log.Print("--------------ELSE----------\n ---Responsable--->", Responsable)

			id, err := primitive.ObjectIDFromHex(Responsable)
			if err != nil {
				return nil, errors.New(err.Error())
			} else {

				log.Print("--------------ELSE----------\n ---IDIIII--->", id)
				//Responsable Groups
				groups.BorrowersId = id
				if addResponsableToGroup.(bool) {
					log.Print("\n--------------addResponsableToGroup :----------> ", addResponsableToGroup.(bool))
					log.Print("\n--------------id :----------> ", id)

					ObjectIdList = append(ObjectIdList, id)
					groups.MembersBrrowers = ObjectIdList
					log.Print("leng : ", len(ObjectIdList))
				}

			}
		}
		if MembersBrrowers != nil {
			MembersBrrowersList := MembersBrrowers.([]interface{})
			for i := 0; i < len(MembersBrrowersList); i++ {
				_id, err := primitive.ObjectIDFromHex(MembersBrrowersList[i].(string))
				if err != nil {
					return nil, err
				}
				ObjectIdList = append(ObjectIdList, _id)
			}
			groups.MembersBrrowers = ObjectIdList
			log.Print(len(ObjectIdList))
		}

		log.Print("add group \n ")
		log.Print(groups.ToString())
		// filter to find duplicate group by name groups
		f := bson.M{}
		f["name"] = groups.NameGroup
		tab, err := (&CirculationModel.Groups{}).FindMany(f)
		if len(tab) == 0 {
			log.Println("result dup ===> ", err)
			lastId, errInsertGroup := groups.Store()
			if errInsertGroup != nil {
				log.Fatal("error inserting Groups --> ", errInsertGroup)
			}
			fmt.Println(lastId.Hex())
			return lastId.Hex(), nil
		}
		return "doucment duplacte chose anthor name ", nil
	},
}

var UpdateOneGroup = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"message": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"responsable": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"addResponsableToGroup": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"sendMailReservationToResponsable": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"sendMailRappelToResponsable": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"sendLetterRappelToResponsable": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"sendLetterReservationToResponsable": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"imprimeNameGroupOneLetter": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"imprimeNameGroupOneLetterReservation": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		// todo complet this
		"members": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		GroupUpdate := bson.M{}
		group := CirculationModel.Groups{}
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, errors.New("Error to convert id status to HEX")
		}
		group.Id = _id

		if p.Args["responsable"] != nil {
			responsableId, err := primitive.ObjectIDFromHex(p.Args["responsable"].(string))
			if err != nil {
				return nil, err
			}
			GroupUpdate["borrower_id"] = responsableId
		}
		if name := p.Args["name"]; name != nil {
			GroupUpdate["name"] = name.(string)
		}
		if message := p.Args["message"]; message != nil {
			GroupUpdate["message"] = message.(string)
		}

		if addResponsableToGroup := p.Args["addResponsableToGroup"]; addResponsableToGroup != nil {
			GroupUpdate["add_responsable_to_group"] = addResponsableToGroup.(bool)
		}
		if sendMailReservationToResponsable := p.Args["sendMailReservationToResponsable"]; sendMailReservationToResponsable != nil {
			GroupUpdate["mail_reservation_to_responsable"] = sendMailReservationToResponsable.(bool)
		}
		if sendMailRappelToResponsable := p.Args["sendMailRappelToResponsable"]; sendMailRappelToResponsable != nil {
			GroupUpdate["mail_rappel_to_responsable"] = sendMailRappelToResponsable.(bool)
		}
		if sendLetterRappelToResponsable := p.Args["sendLetterRappelToResponsable"]; sendLetterRappelToResponsable != nil {
			GroupUpdate["letter_rappel_to_responsable"] = sendLetterRappelToResponsable.(bool)
		}
		if sendLetterReservationToResponsable := p.Args["sendLetterReservationToResponsable"]; sendLetterReservationToResponsable != nil {
			GroupUpdate["letter_reservation_to_responsable"] = sendLetterReservationToResponsable.(bool)
		}
		if imprimeNameGroupOneLetter := p.Args["imprimeNameGroupOneLetter"]; imprimeNameGroupOneLetter != nil {
			GroupUpdate["imprime_name_group_one_letter"] = imprimeNameGroupOneLetter.(bool)
		}
		if imprimeNameGroupOneLetterReservation := p.Args["imprimeNameGroupOneLetterReservation"]; imprimeNameGroupOneLetterReservation != nil {
			GroupUpdate["imprime_name_group_one_letter_teservation"] = imprimeNameGroupOneLetterReservation.(bool)
		}

		return group.Update(GroupUpdate)
	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneGroup = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Groups))

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
