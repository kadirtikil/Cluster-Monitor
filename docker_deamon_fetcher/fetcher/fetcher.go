package fetcher

import (
    "log"
    "context"
    "encoding/json"

    

    "github.com/docker/docker/client"
   	"github.com/docker/docker/api/types/container"

)


func FetchContainers() ([]byte) {
    
    // apiClient is the socket of docker on the system
    // client.FromEnv is a memory adress...
    apiClient, err := client.NewClientWithOpts(client.FromEnv)

    if err != nil {
        log.Fatalf("Failed to create Docker client: %v", err)
    }


    if err != nil {
		panic(err)
	}
	defer apiClient.Close()

	containers, err := apiClient.ContainerList(context.Background(), container.ListOptions{All: true})
	if err != nil {
		panic(err)
	}

    // return the containers variable, its already a jsoni
    retVal, err := json.Marshal(containers)
    if err != nil {
        panic(err)
    }

    return retVal        
}
