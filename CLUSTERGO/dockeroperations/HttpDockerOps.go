package dockeroperations

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func respondWithError(w http.ResponseWriter, statusCode int, message string, err error) {
	log.Println(message, err)
	http.Error(w, message, statusCode)
}

func readRequestBody(r *http.Request, v interface{}) error {
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

func HttpRestartContainer(w http.ResponseWriter, r *http.Request) {
	var docker_container DockerContainer

	if err := readRequestBody(r, &docker_container); err != nil {
		respondWithError(w, http.StatusBadRequest, "Failed", err)
		return
	}

	if _, err := RestartContainer(docker_container.ContainerID); err != nil {
		log.Println("Error trying to exec RestartContainer in HttpRestartContainer: ", err)
		http.Error(w, "Error trying to exec RestartContainer in HttpRestartContainer", http.StatusBadRequest)
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Container restarted successfully"))
}

func HttpPauseContainer(w http.ResponseWriter, r *http.Request) {
	var docker_container DockerContainer

	if err := readRequestBody(r, &docker_container); err != nil {
		respondWithError(w, http.StatusBadRequest, "Failed", err)
		return
	}

	if _, err := PauseContainer(docker_container.ContainerID); err != nil {
		log.Println("Error trying to exec RestartContainer in HttpRestartContainer: ", err)
		http.Error(w, "Error trying to exec RestartContainer in HttpRestartContainer", http.StatusBadRequest)
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Container paused successfully"))
}

func HttpRemoveContainer(w http.ResponseWriter, r *http.Request) {
	var docker_container DockerContainer

	if err := readRequestBody(r, &docker_container); err != nil {
		respondWithError(w, http.StatusBadRequest, "Failed", err)
		return
	}

	if _, err := RemoveContainer(docker_container.ContainerID); err != nil {
		log.Println("Error trying to exec RestartContainer in HttpRestartContainer: ", err)
		http.Error(w, "Error trying to exec RestartContainer in HttpRestartContainer", http.StatusBadRequest)
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Container deleted successfully"))
}

func HttpKillContainer(w http.ResponseWriter, r *http.Request) {
	var docker_container DockerContainer

	if err := readRequestBody(r, &docker_container); err != nil {
		respondWithError(w, http.StatusBadRequest, "Failed", err)
		return
	}

	if _, err := KillContainer(docker_container.ContainerID); err != nil {
		log.Println("Error trying to exec KillContainer in HttpKillContainer: ", err)
		http.Error(w, "Error trying to exec KillContainer in HttpKillContainer", http.StatusBadRequest)
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Container is RIP"))

}
