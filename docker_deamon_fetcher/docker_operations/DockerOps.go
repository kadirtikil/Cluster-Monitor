package dockeroperations


import (
    "fmt"
    
    "github.com/docker/docker/api/types/container"
    "github.com/docker/docker/client"
    "golang.org/x/net/context"
)

/**
    TODO: 
        - send refresh after executing one of these ops
*/


func RestartContainer(id string) error {
    cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
    if err != nil {
        return fmt.Errorf("Error trying to create the client: %v", err)
    }


    if err := cli.ContainerRestart(context.Background(), id, container.StopOptions{}); err != nil {
        fmt.Println(err)
        return fmt.Errorf("Error trying to start the container: %v", err)
    }
    return nil
}


func PauseContainer(id string) error {
    cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
    if err != nil {
        return fmt.Errorf("Error trying to create the client in PauseContainer: %v", err)
    }

    if err := cli.ContainerPause(context.Background(), id); err != nil {
        return fmt.Errorf("Error trying to start the container: %v", err)
    }

    return nil
}


func RemoveContainer(id string) error {
    cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
    if err != nil {
        return fmt.Errorf("Error trying to create the client in PauseContainer: %v", err)
    }

    if err := cli.ContainerRemove(context.Background(), id, container.RemoveOptions{}); err != nil {
        return fmt.Errorf("Error trying to start the container: %v", err)
    }

    return nil
}


func KillContainer(id string) error {
    cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
    if err!= nil {
        return fmt.Errorf("Error trying to create the client in KillContainer: %v", err)
    }

    // its 15 now but i should  change it later into taking the signal as an argument
    // such that it can be controlled as well for containers that for exmaple need to be shut down asap or something
    if err := cli.ContainerKill(context.Background(), id, "SIGKILL"); err != nil {
        return fmt.Errorf("Error trying to kill the container in KillContainer: %v", err)
    }


    return nil
}

