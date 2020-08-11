package CatalogingModel

import "go.mongodb.org/mongo-driver/bson/primitive"

type Keyword struct {
	Id      primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Word    string               `json:"word"`
	Lang    string               `json:"lang"`
	Records []primitive.ObjectID `json:"records"`
	Serials []primitive.ObjectID `json:"serials"`
}
