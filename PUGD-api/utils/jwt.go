package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// JwtObj ...
type JwtObj struct {
	Token  string    `json:"token"`
	Expire time.Time `json:"expire"`
}

// JwtGenerateToken ...
func JwtGenerateToken(id string) (*JwtObj, error) {
	// After how much time will the token expire (2 hours here)
	expireAfterTime := time.Hour * 2
	// App name claim
	iss := os.Getenv("APP_NAME")
	// The secret key
	appSecret := os.Getenv("SECRET_KEY")
	// Calculate the Expiration Time
	expireTime := time.Now().Add(expireAfterTime)

	stdClaims := jwt.StandardClaims{
		ExpiresAt: expireTime.Unix(),
		IssuedAt:  time.Now().Unix(),
		Id:        string(encrypt([]byte(id),"test")),
		Issuer:    iss,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, stdClaims)
	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(appSecret))

	if err != nil {
		fmt.Println("config is wrong, can not generate jwt")
		return nil, nil
	}
	data := &JwtObj{Token: tokenString, Expire: expireTime}

	return data, err
}

// JwtParseUser ...
func JwtParseUser(tokenString string) (string, error) {

	claims := jwt.StandardClaims{}
	_, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {

			fmt.Println("unexpected signing method")
			return "", nil
		}

		secret := os.Getenv("SECRET_KEY")
		return []byte(secret), nil
	})
	if err != nil {
		return "", err
	}

	if claims.VerifyExpiresAt(time.Now().Unix(), true) == false {
		fmt.Println("token is expired")
		return "", nil
	}
	appName := "myAppName"
	if !claims.VerifyIssuer(appName, true) {
		fmt.Println("token's issuer is wrong,greetings Hacker")
		return "", nil
	}

	return claims.Id, err
}

// JwtParseUser ...
func JwtIsValid(tokenString string) (bool, error) {
	tokenString = strings.Replace(tokenString, "Bearer ", "", -1)

	// Parse the token with the given key
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if err != nil {
		return false, errors.New("error parsing token")
	}

	// Prints are just for debugging purposes
	if token.Valid {
		fmt.Println("Good Token")
		return true, nil
	} else if ve, ok := err.(*jwt.ValidationError); ok {
		if ve.Errors&jwt.ValidationErrorMalformed != 0 {
			fmt.Println("That's not even a token")
			return false, nil
		} else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
			// Token is either expired or not active yet
			fmt.Println("Token expired")
			return false, nil

		} else {
			fmt.Println("Couldn't handle this token:", err)
			return false, nil
		}
	} else {
		fmt.Println("Couldn't handle this token:", err)
		return false, nil
	}
}

func DecodeJWT(t string) (*jwt.StandardClaims, error) {
	t = strings.Replace(t, "Bearer ", "", -1)
	token, _ := jwt.ParseWithClaims(t, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if claims, ok := token.Claims.(*jwt.StandardClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, errors.New("error parsing")
}

func Authorize(cont *gin.Context) (*jwt.StandardClaims, error) {

	token := cont.GetHeader("Authorization")
	if token == "" {
		return nil, errors.New("No Authorization Header")
	}
	userAuthorized, err := JwtIsValid(token)

	if err != nil || !userAuthorized {

		return nil, errors.New("Invalid token")
	}

	claim, errP := DecodeJWT(token)
	if errP != nil {
		return nil, errors.New("Bad claims")
	}
	return claim, nil

}
func encrypt(data []byte, passphrase string) []byte {
	block, _ := aes.NewCipher([]byte(createHash(passphrase)))
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		panic(err.Error())
	}
	ciphertext := gcm.Seal(nonce, nonce, data, nil)
	return ciphertext
}

func decrypt(data []byte, passphrase string) []byte {
	key := []byte(createHash(passphrase))
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}
	nonceSize := gcm.NonceSize()
	nonce, ciphertext := data[:nonceSize], data[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		panic(err.Error())
	}
	return plaintext
}
// Use to hash our pass phrase used in encryption
func createHash(key string) string {
	hasher := md5.New()
	hasher.Write([]byte(key))
	return hex.EncodeToString(hasher.Sum(nil))
}