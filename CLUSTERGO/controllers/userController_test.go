package controllers_test

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/kadirtikil/clustermonitor/controllers"
)

// TODO:
// might add an interface to it to make it immutable though they are never passed as references in the tests.
// might do it anyway
var (
	non_existing_user     = bytes.NewReader([]byte(`{"Email": "test@test.com", "Password": "Test123!"}`))
	password_not_matching = bytes.NewReader([]byte(`{"Email": "tempy", "Password": "temptemp"}`))
)

func TestEmailSanitizer(t *testing.T) {
	tests := []struct {
		name  string
		email string
	}{
		{
			name:  "1st: no email",
			email: "",
		},
		{
			name:  "2nd: invalid email",
			email: "123kartoffelbrei",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			validEmail, err := controllers.EmailSanitizer(test.email)
			if err == nil || validEmail {
				t.Errorf("email is not valid: %v", err)
			}
		})
	}
}

func TestPasswordSanitizer(t *testing.T) {
	tests := []struct {
		name     string
		password string
	}{
		{
			name:     "1st: no password",
			password: "",
		},
		{
			name:     "2nd: invalid password",
			password: "123kartoffelbrei",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			validPw, err := controllers.PasswordSanitizer(test.password)
			if err == nil || validPw {
				t.Errorf("password is not valid: %v", err)
			}
		})
	}
}

func TestSignUp(t *testing.T) {
	// generate a request and a recorder.
	// the recorder is "recording" the interaction
	// its basically the response

	tests := []struct {
		name string
		req  *http.Request
		rec  *httptest.ResponseRecorder
	}{
		{
			name: "1st: invalid request body",
			req:  httptest.NewRequest("POST", "/signup", nil),
			rec:  httptest.NewRecorder(),
		},
		{
			name: "2nd: non existing user",
			req:  httptest.NewRequest("POST", "/signup", non_existing_user),
			rec:  httptest.NewRecorder(),
		},
		{
			name: "3rd: hashed and plain passwords dont match",
			req:  httptest.NewRequest("POST", "/signup", password_not_matching),
			rec:  httptest.NewRecorder(),
		},
	}

	// since http handlefuncs cannot return errors, because they are the last instance before leaving the
	// context of our backend. what it can do tho, is sending http status codes.
	// meaning we will use http test, to generate a responsewrite and a request, and check what happens to the response
	// writers status code. this way we can determine if the http interaction went through or not.
	for _, elem := range tests {
		t.Run(elem.name, func(t *testing.T) {
			controllers.SignUp(elem.rec, elem.req)

			if elem.rec.Code == http.StatusOK {
				t.Errorf("expected %d, actual %d", http.StatusOK, elem.rec.Code)
			}
		})
	}
}

func TestLogin(t *testing.T) {

	test := []struct {
		name string
		req  *http.Request
		rec  *httptest.ResponseRecorder
	}{
		{
			name: "1st: invalid request body",
			req:  httptest.NewRequest("POST", "/login", nil),
			rec:  httptest.NewRecorder(),
		},
		{
			name: "2nd: non existing user",
			req:  httptest.NewRequest("POST", "/signup", non_existing_user),
			rec:  httptest.NewRecorder(),
		},
		{
			name: "3rd: hashed and plain passwords dont match",
			req:  httptest.NewRequest("POST", "/signup", password_not_matching),
			rec:  httptest.NewRecorder(),
		},
	}

	for _, elem := range test {
		t.Run(elem.name, func(t *testing.T) {
			controllers.Login(elem.rec, elem.req)

			if elem.rec.Code == http.StatusOK {
				t.Errorf("expected %d, actual %d", http.StatusOK, elem.rec.Code)
			}
		})
	}
}
