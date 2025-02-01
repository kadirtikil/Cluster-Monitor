package ws

import (
	"fmt"

	"github.com/docker/docker/api/types"

	"github.com/kadirtikil/clustermonitor/dockeroperations"
)

func WsDockerOperation(wsMsg WsMsg) ([]types.ContainerJSON, error) {
	action, err := wsMsg.GetAction()
	if err != nil {
		return []types.ContainerJSON{}, err
	}

	id := wsMsg.Id

	switch action {
	case "fetch":
		return dockeroperations.FetchContainers()
	case "restart":
		return dockeroperations.RestartContainer(id)
	case "pause":
		return dockeroperations.PauseContainer(id)
	case "remove":
		return dockeroperations.RemoveContainer(id)
	case "kill":
		return dockeroperations.KillContainer(id)
	default:
		return []types.ContainerJSON{}, fmt.Errorf("the action was not valid")
	}
}

func UpdateContainerStatus(wsMsg WsMsg) error {
	return nil
}
