package controllers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/kadirtikil/clustermonitor/initializers"
	"github.com/kadirtikil/clustermonitor/models"
	"github.com/kadirtikil/clustermonitor/utils"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	// read the request body
	// find email and password
	if err := utils.ReadRequestBody(r, &body); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "could not read rbody in signup function in userscontroller: ", err)
		return
	}

	// hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	user := models.User{Email: body.Email, Password: string(hash)}
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "could not hash the password in signup func: ", err)
	}

	// check first if a user like that already exists
	// check for email since email is unique
	var duplicate_user models.User
	if result := initializers.DB.Where("email = ?", user.Email).First(&duplicate_user); result.Error == nil {
		utils.RespondWithError(w, http.StatusBadRequest, "", result.Error)
	}

	// create the user with the email and password of the rbody
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "could not create user in signup function user controller: ", result.Error)
		return
	}

	// all guards passed, return status ok
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User has been created!"))

}

func Login(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string
		Password string
	}

	// read the request
	if err := utils.ReadRequestBody(r, &body); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "could not read the request", err)
		return
	}

	// check if the user exists in db
	var user models.User
	if result := initializers.DB.Where("email = ?", body.Email).First(&user); result.Error != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "user does not exist", result.Error)
		return
	}

	// user exists, so check body passw with stored passw
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "password is wrong", err)
		return
	}

	// so the user is gucci in here give bro a JWT token on the house
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"sub": user.ID,
			"exp": time.Now().Add(time.Hour).Unix(),
		})

	secret := os.Getenv("SECRET_KEY_JWT")

	if secret == "" {
		utils.RespondWithError(w, http.StatusBadRequest, "secret not found in login", nil)
		return
	}

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "password authentication failed", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}
