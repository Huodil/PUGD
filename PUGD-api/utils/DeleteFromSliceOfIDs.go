package utils

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeleteFromSliceOfIds(a primitive.ObjectID, b []primitive.ObjectID) []primitive.ObjectID {
	for i, x := range b {
		if x == a {
			// Remove the element at index i from a.
			copy(b[i:], b[i+1:])                // Shift b[i+1:] left one index.
			b[len(b)-1] = primitive.NilObjectID // Erase last element (write zero value).
			b = b[:len(b)-1]                    // Truncate slice.
			break
		}
	}

	return b

}
