package auth


import(
    "github.com/golang-jwt/jwt"
)


func MakeJWT(userID uuid.UUID, tokenSecret string, expiresIn time.Duration) (string, error) {
    token := jwt.NewWithClaims()
}
