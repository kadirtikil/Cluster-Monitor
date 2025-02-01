package initializers

import (
	"fmt"

	"github.com/joho/godotenv"
)

func LoadEnv() error {
	if err := godotenv.Load(); err != nil {
		return fmt.Errorf("could not load the enviromental variable in loadenv: %v", err)
	}

	return nil
}
