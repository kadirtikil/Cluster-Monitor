package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func ContainsStringArr(arr []string, tocheck string) bool {
	for _, row := range arr {
		if row == tocheck {
			return true
		}
	}
	return false
}

func ContainsRuneArr(arr []rune, tocheck rune) bool {
	for _, row := range arr {
		if row == tocheck {
			return true
		}
	}
	return false
}

func GetRunesOfStringSlice(stringSlice []string) []rune {
	var runes []rune
	for _, elem := range stringSlice {
		for _, r := range elem {
			if !ContainsRuneArr(runes, r) {
				runes = append(runes, r)
			}
		}
	}
	return runes
}

func ReadRequestBody(r *http.Request, v interface{}) error {
	defer r.Body.Close()

	msg, err := io.ReadAll(r.Body)
	if err != nil {
		return fmt.Errorf("error reading request body: %w", err)
	}

	if err := json.Unmarshal(msg, v); err != nil {
		return fmt.Errorf("error unmarshalling JSON: %w", err)
	}

	return nil
}

func RespondWithError(w http.ResponseWriter, statusCode int, message string, err error) {
	log.Println(message, err)
	http.Error(w, message, statusCode)
}

var cyan = "\033[36m"

func TODO(task string) {
	fmt.Println("\n" + cyan + "A TASK THAT NEEDS TO BE DONE:\n" + task + "\n")
}
