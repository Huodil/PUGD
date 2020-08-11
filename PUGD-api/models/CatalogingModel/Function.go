package CatalogingModel

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Function struct {
	Id     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Value  string             `json:"value"`
	Number int                `json:"number"`
}
