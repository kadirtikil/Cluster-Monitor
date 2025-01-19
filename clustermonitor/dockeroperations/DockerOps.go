package dockeroperations

import (
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"golang.org/x/net/context"
)

/**
  TODO:
      - send refresh after executing one of these ops DONE (use Inspect)
*/

func FetchContainers() ([]types.ContainerJSON, error) {
	cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
	if err != nil {
		return []types.ContainerJSON{}, err
	}

	containers, err := cli.ContainerList(context.Background(), container.ListOptions{All: true})
	if err != nil {
		return []types.ContainerJSON{}, err
	}

	var containerJSON []types.ContainerJSON

	for _, elem := range containers {
		tempContainer, err := cli.ContainerInspect(context.Background(), elem.ID)
		if err != nil {
			return []types.ContainerJSON{}, fmt.Errorf("Error trying to loop container to type cast to JSON in FetchContainers: %v", err)
		}
		containerJSON = append(containerJSON, tempContainer)
	}

	return containerJSON, nil
}

func RestartContainer(id string) ([]types.ContainerJSON, error) {
	cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to create the client: %v", err)
	}

	if err := cli.ContainerRestart(context.Background(), id, container.StopOptions{}); err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to start the container: %v", err)
	}

	jsonContainer, err := inspectContainer(id)
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to inspect container after restarting it!")
	}

	return jsonContainer, nil
}

func PauseContainer(id string) ([]types.ContainerJSON, error) {
	cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to create the client in PauseContainer: %v", err)
	}

	if err := cli.ContainerPause(context.Background(), id); err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to start the container: %v", err)
	}

	jsonContainer, err := inspectContainer(id)
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to inspect the container after pausing it: %v", err)
	}

	return jsonContainer, nil
}

func RemoveContainer(id string) ([]types.ContainerJSON, error) {
	cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to create the client in PauseContainer: %v", err)
	}

	if err := cli.ContainerRemove(context.Background(), id, container.RemoveOptions{}); err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to start the container: %v", err)
	}

	jsonContainer, err := FetchContainers()
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to fetch after deleting a container: %v", err)
	}

	return jsonContainer, nil
}

func KillContainer(id string) ([]types.ContainerJSON, error) {
	cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to create the client in KillContainer: %v", err)
	}

	// its 15 now but i should  change it later into taking the signal as an argument
	// such that it can be controlled as well for containers that for exmaple need to be shut down asap or something
	if err := cli.ContainerKill(context.Background(), id, "SIGKILL"); err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to kill the container in KillContainer: %v", err)
	}

	jsonContainer, err := inspectContainer(id)
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to inspect the container after killing it: %v", err)
	}

	return jsonContainer, nil

}

func inspectContainer(id string) ([]types.ContainerJSON, error) {
	cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to create the client in InspectContainer: %v", err)
	}

	jsonContainer, err := cli.ContainerInspect(context.Background(), id)
	if err != nil {
		return []types.ContainerJSON{}, fmt.Errorf("Error trying to inspect the container in InspectContainer: %v", err)
	}

	var retVal []types.ContainerJSON
	retVal = append(retVal, jsonContainer)

	return retVal, nil
}
