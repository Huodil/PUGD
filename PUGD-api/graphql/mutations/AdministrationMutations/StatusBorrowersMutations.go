package AdministrationMutations

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneStatusBorrowers = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"status_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"is_autorized_for_borrowerd": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_loan": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_historique_pret": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},

		"is_autorized_for_reservation": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_connected_opac": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_dsi": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_dsi_privat": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_sarche": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_access_to_list_borrowerd": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_request_prolongation": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_changed_password": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		status := AdministrationModels.StatusBorrowers{}

		if name := p.Args["status_name"]; name != nil {
			status.Name = name.(string)
		}
		if isAutorizedForBorrowerd := p.Args["is_autorized_for_borrowerd"]; isAutorizedForBorrowerd != nil {
			status.IsAutorizedForBorrowerd = isAutorizedForBorrowerd.(bool)
		}
		if isAutorizedForLoan := p.Args["is_autorized_for_borrowerd"]; isAutorizedForLoan != nil {
			status.IsAutorizedForLoan = isAutorizedForLoan.(bool)
		}
		if IsAutorizedForHistoriquePret := p.Args["is_autorized_for_historique_pret"]; IsAutorizedForHistoriquePret != nil {
			status.IsAutorizedForHistoriquePret = IsAutorizedForHistoriquePret.(bool)
		}
		if IsAutorizedForReservation := p.Args["is_autorized_for_reservation"]; IsAutorizedForReservation != nil {
			status.IsAutorizedForReservation = IsAutorizedForReservation.(bool)
		}
		if IsAutorizedForConnectedOPAC := p.Args["is_autorized_for_connected_opac"]; IsAutorizedForConnectedOPAC != nil {
			status.IsAutorizedForConnectedOPAC = IsAutorizedForConnectedOPAC.(bool)
		}
		if IsAutorizedForDSI := p.Args["is_autorized_for_dsi"]; IsAutorizedForDSI != nil {
			status.IsAutorizedForDSI = IsAutorizedForDSI.(bool)
		}
		if IsAutorizedForDsiPrivat := p.Args["is_autorized_for_dsi_privat"]; IsAutorizedForDsiPrivat != nil {
			status.IsAutorizedForDsiPrivat = IsAutorizedForDsiPrivat.(bool)
		}
		if IsAutorizedForSarche := p.Args["is_autorized_for_sarche"]; IsAutorizedForSarche != nil {
			status.IsAutorizedForSarche = IsAutorizedForSarche.(bool)
		}
		if IsAutorizedForAccessToListBorrowerd := p.Args["is_autorized_for_access_to_list_borrowerd"]; IsAutorizedForAccessToListBorrowerd != nil {
			status.IsAutorizedForAccessToListBorrowerd = IsAutorizedForAccessToListBorrowerd.(bool)
		}
		if IsAutorizedForRequestProlongation := p.Args["is_autorized_for_request_prolongation"]; IsAutorizedForRequestProlongation != nil {
			status.IsAutorizedForRequestProlongation = IsAutorizedForRequestProlongation.(bool)
		}
		if IsAutorizedForChangedPassword := p.Args["is_autorized_for_request_prolongation"]; IsAutorizedForChangedPassword != nil {
			status.IsAutorizedForChangedPassword = IsAutorizedForChangedPassword.(bool)
		}

		statusExists := status.Find()
		if statusExists != nil {
			return nil, errors.New("status Borrowerd already exists")
		}

		lastId, errInsert := status.Store()
		if errInsert != nil {
			return nil, errInsert
		}
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

var UpdateOneStatusBorrowers = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"status_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"is_autorized_for_borrowerd": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_loan": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_historique_pret": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},

		"is_autorized_for_reservation": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_connected_opac": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_dsi": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_dsi_privat": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_sarche": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_access_to_list_borrowerd": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_request_prolongation": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"is_autorized_for_changed_password": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		StatusUpdate := bson.M{}
		status := AdministrationModels.StatusBorrowers{}
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, errors.New("Error to convert id status to HEX")
		}
		status.Id = _id

		if name := p.Args["status_name"]; name != nil {
			status.Name = name.(string)
		}
		if isAutorizedForBorrowerd := p.Args["is_autorized_for_borrowerd"]; isAutorizedForBorrowerd != nil {
			StatusUpdate["is_autorized_for_borrowerd"] = isAutorizedForBorrowerd.(bool)
		}
		if isAutorizedForLoan := p.Args["is_autorized_for_loan"]; isAutorizedForLoan != nil {
			StatusUpdate["is_autorized_for_loan"] = isAutorizedForLoan.(bool)
		}
		if IsAutorizedForHistoriquePret := p.Args["is_autorized_for_historique_pret"]; IsAutorizedForHistoriquePret != nil {
			StatusUpdate["is_autorized_for_historique_pret"] = IsAutorizedForHistoriquePret.(bool)
		}
		if IsAutorizedForReservation := p.Args["is_autorized_for_reservation"]; IsAutorizedForReservation != nil {
			StatusUpdate["is_autorized_for_reservation"] = IsAutorizedForReservation.(bool)
		}
		if IsAutorizedForConnectedOPAC := p.Args["is_autorized_for_connected_opac"]; IsAutorizedForConnectedOPAC != nil {
			StatusUpdate["is_autorized_for_connected_opac"] = IsAutorizedForConnectedOPAC.(bool)
		}
		if IsAutorizedForDSI := p.Args["is_autorized_for_dsi"]; IsAutorizedForDSI != nil {
			StatusUpdate["is_autorized_for_dsi"] = IsAutorizedForDSI.(bool)
		}
		if IsAutorizedForDsiPrivat := p.Args["is_autorized_for_dsi_privat"]; IsAutorizedForDsiPrivat != nil {
			StatusUpdate["is_autorized_for_dsi_privat"] = IsAutorizedForDsiPrivat.(bool)
		}
		if IsAutorizedForSarche := p.Args["is_autorized_for_sarche"]; IsAutorizedForSarche != nil {
			StatusUpdate["is_autorized_for_sarche"] = IsAutorizedForSarche.(bool)
		}
		if IsAutorizedForAccessToListBorrowerd := p.Args["is_autorized_for_access_to_list_borrowerd"]; IsAutorizedForAccessToListBorrowerd != nil {
			StatusUpdate["is_autorized_for_access_to_list_borrowerd"] = IsAutorizedForAccessToListBorrowerd.(bool)
		}
		if IsAutorizedForRequestProlongation := p.Args["is_autorized_for_request_prolongation"]; IsAutorizedForRequestProlongation != nil {
			StatusUpdate["is_autorized_for_request_prolongation"] = IsAutorizedForRequestProlongation.(bool)
		}
		if IsAutorizedForChangedPassword := p.Args["is_autorized_for_request_prolongation"]; IsAutorizedForChangedPassword != nil {
			StatusUpdate["is_autorized_for_request_prolongation"] = IsAutorizedForChangedPassword.(bool)
		}
		return status.Update(StatusUpdate)
	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneStatusBorrowers = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.StatusBorrowers))

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
