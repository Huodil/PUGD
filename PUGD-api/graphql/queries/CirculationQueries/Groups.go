package CirculationQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CirculationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"strings"
)

//Get record by name
var GetGroupsByName = &graphql.Field{
	Type: CirculationTypes.GroupsType,
	Args: graphql.FieldConfigArgument{
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		result := bson.M{}
		nameGroup := p.Args["name"]

		if !strings.Contains(nameGroup.(string), "*") {
			res, err := (&CirculationModel.Groups{}).FindOnes(bson.M{"name": nameGroup.(string)})
			if err != nil {
				return nil, err
			}
			log.Printf("resultat", res)
			var newlist []*CirculationModel.Borrower
			for _, element := range res.MembersBrrowers {
				log.Printf("==>>>>>  %s ", element)
				b, ero := (&CirculationModel.Borrower{}).FindOne(element)
				if ero != nil {
					log.Print("no doc ")
				}
				log.Print("===N>>> ", b.ToString())

				if b != nil {
					newlist = append(newlist, b)
				}
			}
			result["_id"] = res.Id.Hex()
			result["name"] = res.NameGroup
			respo, err := (&CirculationModel.Borrower{}).FindOne(res.BorrowersId)
			result["responsable"] = respo
			result["add_responsable_to_group"] = res.AddResponsableToGroup
			result["mail_reservation"] = res.SendMailReservationToResponsable
			result["mail_rappel"] = res.SendMailRappelToResponsable
			result["letter_rappel"] = res.SendLetterRappelToResponsable
			result["letter_reservation"] = res.SendLetterReservationToResponsable
			result["imprime_name_one_letter"] = res.ImprimeNameGroupOneLetter
			result["imprime_name_one_letter_reservation"] = res.ImprimeNameGroupOneLetterReservation
			result["created_at"] = res.CreatedAt
			result["members"] = newlist
			return result, nil

		}
		log.Printf(nameGroup.(string))
		return result, nil
	},
}

var GetAllGrroups = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.ListGroupType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		result := []bson.M{}
		groupes, err := (&CirculationModel.Groups{}).FindMany(bson.M{})
		if err != nil {
			log.Printf("error ")

		}
		for _, s := range groupes {
			respo, _ := (&CirculationModel.Borrower{}).FindOne(s.BorrowersId)
			currentReservation := (&CirculationModel.Reservation{}).FindTotalReservationForCopy(
				bson.M{
					"idborrower": s.BorrowersId,
					"confirmed":  false,
				})
			currentLoan := (&CirculationModel.Pret{}).TotalLoan(
				bson.M{
					"idborrower": s.BorrowersId,
					"is_preted":  true,
				})
			result = append(result, bson.M{
				"_id":                s.Id.Hex(),
				"group":              s.NameGroup,
				"responsable":        respo,
				"currentReservation": currentReservation,
				"currentLoan":        currentLoan,
				"membersCount":       len(s.MembersBrrowers),
			})

		}
		/*log.Printf("--------")
		g, errt := json.MarshalIndent(result, "", " ")
		if errt == nil {
			v := string(g)
			fmt.Println(v)
		}*/
		return result, nil
	},
}
