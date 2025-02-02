package middleware_test

import (
	"fmt"
	"net/http/httptest"
	"testing"
)

func TestCheckJWT(t *testing.T) {
	tests := []struct {
		name string
		rec  *httptest.ResponseRecorder
	}{
		// need to figure out how to set cookies on ResponseRecorder
		{
			name: "1st: no token",
			rec:  httptest.NewRecorder(),
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			fmt.Println("all good in the hood")
		})
	}
}
