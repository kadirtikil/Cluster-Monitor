package middleware

import (
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt"
	"github.com/kadirtikil/clustermonitor/utils"
)

func CheckJWT(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("jwt")
		if err != nil {
			// user is not logged in cause no jwt in the cookie
			utils.RespondWithError(w, http.StatusUnauthorized, "no jwt found in checkjwt function in jwtmiddleware", err)
			return
		}

		// now get the tokenstring out of the cookie
		tokenString := cookie.Value

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("SECRET_KEY_JWT")), nil
		})

		if err != nil {
			utils.RespondWithError(w, http.StatusUnauthorized, "not authorized in checkjwt function in jwtmiddleware", err)
			return
		}

		var userID float64
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			userID = claims["sub"].(float64)
			next.ServeHTTP(w, r)
		}

		// this is temporary, please add an authorization mech, such that, not all users have the same rights
		// this is important, because i do not want people to be able to orchestrate others containers (obviously)
		fmt.Println(userID)
	}

}
