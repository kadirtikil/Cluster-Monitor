package ws 

import(
    "fmt"

    "github.com/docker/docker/api/types"

    "github.com/kadirtikil/clustermonitor/dockeroperations"
)


func WsDockerOperation(wsMsg WsMsg) (types.ContainerJSON, error) {
    action, err := wsMsg.GetAction()
    if err != nil {
        return types.ContainerJSON{}, err
    }
       
    container, err := wsMsg.GetData()
    if err != nil {
        return types.ContainerJSON{}, err
    }


    id := container.ID
        
    switch action{
    case "fetch":
        fmt.Println("restart")
    case "restart":
        return dockeroperations.RestartContainer(id)
    case "pause":
        return dockeroperations.PauseContainer(id)
    case "remove":
        return dockeroperations.RemoveContainer(id)
    case "kill":
        return dockeroperations.KillContainer(id)
    default:
        return types.ContainerJSON{}, fmt.Errorf("The action was not valid. Something very fishy is going on here!")
    }

    return types.ContainerJSON{}, fmt.Errorf("Nothin worked in WsDockerOperation.")
}


func UpdateContainerStatus(wsMsg WsMsg) error {
   return nil 
}
