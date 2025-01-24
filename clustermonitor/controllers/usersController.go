package controllers

import (
	"encoding/json"
	"fmt"
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

	// set cors such that only the dns of the client can make requests
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST")

	fmt.Println("Active signup")
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
		utils.RespondWithError(w, http.StatusBadRequest, "could not hash the password in signup function in usercontroller: ", err)
		return
	}

	// check first if a user like that already exists
	// check for email since email is unique
	var duplicate_user models.User
	if result := initializers.DB.Where("email = ?", user.Email).First(&duplicate_user); result.Error == nil {
		utils.RespondWithError(w, http.StatusBadRequest, "", result.Error)
		return
	}

	// create the user with the email and password of the rbody
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "could not create user in signup function in usercontroller: ", result.Error)
		return
	}

	// all guards passed, return status ok
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"msg": "User has been created successfully!"})

}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")

	var body struct {
		Email    string
		Password string
	}

	// read the request
	if err := utils.ReadRequestBody(r, &body); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "could not read the request in login function in usercontroller", err)
		return
	}

	// check if the user exists in db
	var user models.User
	if result := initializers.DB.Where("email = ?", body.Email).First(&user); result.Error != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "user could not be found in login function in usercontroller", result.Error)
		return
	}

	// user exists, so check body passw with stored passw
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "password is wrong in login function in usercontroller", err)
		return
	}

	// so the user is gucci in here give bro a JWT token on the house
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"sub": user.ID,
			"exp": time.Now().Add(time.Minute * 30).Unix(),
		})

	secret := os.Getenv("SECRET_KEY_JWT")

	if secret == "" {
		utils.RespondWithError(w, http.StatusBadRequest, "secret not found in login function in usercontroller", nil)
		return
	}

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "password authentication failed in login function in usercontroller", err)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Expires:  time.Now().Add(time.Minute * 30),
		HttpOnly: true,
		// set sec to true later in procution for https
		Secure: false,
		Path:   "/",
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"msg": "login successful!"})
}

func Logout(w http.ResponseWriter, r *http.Request) {
	// clear the cookie, such that the user cannot access any backend ressources
	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now(),
		HttpOnly: true,
		Path:     "/",
	})
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Logged out successfully!"))
}

func CheckAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST")

	cookie, err := r.Cookie("jwt")
	if err != nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "no one is authorized in checkauth function in usercontroller", err)
		return
	}

	tokenString := cookie.Value

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY_JWT")), nil
	})

	if err != nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "parsing tokenstring did not work in checkauth function in usercontroller", err)
		return
	}

	if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Token is valid"))
		return
	}

	w.WriteHeader(http.StatusUnauthorized)
	w.Write([]byte("kummst hier net rein"))

}
