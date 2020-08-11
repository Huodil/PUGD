package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Book struct {
	Id    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ISBN  string             `json:"isbn"`
	Title string             `json:"title"`
}
