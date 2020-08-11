package utils

import "go.mongodb.org/mongo-driver/bson/primitive"

// ObjectIDNotInSlice returns true if an ObjectID is not in a slice of ObjectIDs
// ObjectIDNotInSlice returns false if an ObjectID is in a slice of ObjectIDs
func ObjectIDNotInSlice(a primitive.ObjectID, list []primitive.ObjectID) bool {
	for _, b := range list {
		if b == a {
			return false
		}
	}
	return true
}
