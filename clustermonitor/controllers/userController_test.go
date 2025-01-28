package controllers_test

import (
	"fmt"
	"testing"
)

func TestSignUp(t *testing.T) {
	tests := []struct {
		name string
	}{
		{
			name: "Pass invalid parameter",
		},
	}

	for i, elem := range tests {
		fmt.Println(i)
		fmt.Println(elem)
	}

}
