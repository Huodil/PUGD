package AcquisitionModels

import "go.mongodb.org/mongo-driver/bson/primitive"

type Suggestion struct {
	ID              primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Isbn            string             `json:"isbn"`
	Title           string             `json:"title"`
	Author          string             `json:"author"`
	Quantity        int                `json:"quantity"`
	Price           float64            `json:"price"`
	DatePublication string             `json:"datepublication"`
	Comments        string             `json:"comments"`
	Source          string             `json:"source"`
	Flag            string             `json:"flag"`
}
