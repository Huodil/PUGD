package AcquisitionModels

import "go.mongodb.org/mongo-driver/bson/primitive"

type Provider struct {
	Id             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Establishement string             `json:"establishement"`
	Name           string             `json:"name"`
	Account        string             `json:"account"`
	Adress         string             `json:"adress"`
	Phone          string             `json:"phone"`
	Email          string             `json:"email"`
	Website        string             `json:"website"`
}
