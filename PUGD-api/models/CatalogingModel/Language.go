package CatalogingModel

import "go.mongodb.org/mongo-driver/bson/primitive"

type Language struct {
	Id      primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Value   string               `json:"value"`
	Records []primitive.ObjectID `json:"records"`
	Serials []primitive.ObjectID `json:"serials"`
}
