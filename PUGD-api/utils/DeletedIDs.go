package utils

import "go.mongodb.org/mongo-driver/bson/primitive"

// DeletedIDs returns the elements in `a` that aren't in `b`
func DeletedIDs(a, b []primitive.ObjectID) []primitive.ObjectID {
	mb := make(map[primitive.ObjectID]struct{}, len(b))
	for _, x := range b {
		mb[x] = struct{}{}
	}
	var diff []primitive.ObjectID
	for _, x := range a {
		if _, found := mb[x]; !found {
			diff = append(diff, x)
		}
	}
	return diff
}
