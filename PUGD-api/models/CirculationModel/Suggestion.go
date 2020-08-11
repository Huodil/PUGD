package CirculationModel

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"os"
	"time"
)

// Suggesstion
type Suggestion struct {
	Id                     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	SuggestionBy           primitive.ObjectID `json:"suggestion_by"` // origine : id borrower
	Ponderation            float64            `json:"ponderation"`
	Etat                   bool               `json:"etat"`
	Quantite               int                `json:"quantite"`
	TitreOrDescriptionFile string             `json:"titre_or_desc_file"`
	Editeur                string             `json:"editeur"`
	Auteur                 string             `json:"auteur"`
	ISBN                   string             `json:"isbn"`
	Prix                   float64            `json:"prix"`
	URLAssocier            string             `json:"url_associer"`
	Commentaires           string             `json:"commentaires"`
	CommentairesGestion    string             `json:"commentaires_de_gestion"`
	DateDePublication      time.Time          `json:"date_de_publication"`
	DateCreationSugg       time.Time          `json:"date_creation_sugg"`
	PieceJointe            string             `json:"piece_jointe"`
}

// to String Reservation
func (sugg Suggestion) ToString() string {
	result := fmt.Sprintf("\nReservation id: %s", sugg.Id.Hex())
	result = result + fmt.Sprintf("\nSuggestionBy : %s", sugg.SuggestionBy.Hex())
	result = result + fmt.Sprintf("\nPonderation : %s", sugg.Ponderation)
	result = result + fmt.Sprintf("\nEtat : %s", sugg.Etat)
	result = result + fmt.Sprintf("\nQuantite : %v", sugg.Quantite)
	//result = result + fmt.Sprintf("\nCategory : %d \n", this.Category)
	return result
}

// todo fix new suggestion
func (sugg *Suggestion) Store() (*primitive.ObjectID, error) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := models.DB.Collection(os.Getenv(db.Suggestion))
	result, errStoring := coll.InsertOne(ctx, sugg)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
