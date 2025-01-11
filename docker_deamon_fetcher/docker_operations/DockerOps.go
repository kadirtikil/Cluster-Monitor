package dockeroperations 


import (
    "fmt"

    "github.com/docker/docker/api/types/container"
    "github.com/docker/docker/client"
)


func KillContainer(container_id []byte) {
    cli, err := cli.ContainerList
    
    fmt.Println(string(container_id))
}
