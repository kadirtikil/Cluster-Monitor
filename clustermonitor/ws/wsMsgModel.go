package ws

import (
    "fmt"

    "github.com/kadirtikil/clustermonitor/utils"

    "github.com/docker/docker/api/types"
)

// only valid actions are these
var validActions = []string{
    "fetch", "restart", "kill", "remove", "pause",
}

var validRunes = []rune{}

type WsMsg struct {
	Action string `json:"action"`
	Data   types.ContainerJSON `json:"data"`
}


func (wsMsg *WsMsg) GetAction() (string, error){
    /** 
        The following is DONE
        sanitize it:
            - check if has blank spaces
            - check if it has any other char than the ones used in validActions
                - make func to reasses, which rune are valid
            - check if it is an element of validActions
    */
    action := "invalid" 

    validRunes := utils.GetRunesOfStringSlice(validActions)

    if wsMsg.Action == ""{
        return "", fmt.Errorf("No actions has been found in the msg!")
    }
    

    for _, r := range wsMsg.Action {
        if !utils.ContainsRuneArr(validRunes, r) {
            return "", fmt.Errorf("Action contains invalid runes!")
        }
    }

    for _, elem := range validActions {
        
        if wsMsg.Action == elem {
            action = elem
            break
        }
    }

    if action != "invalid" {
        return action, nil
    }
    return "", fmt.Errorf("The fit aint it cuh!")
}


func (wsMsg *WsMsg) GetData() (types.ContainerJSON, error) {
    /** 
        TODO: 
            - check if data is not empty
            - check if data can be unmarsheled into an object with docker container metadata
        NOTES:
            - no need for unmarsheling, ContainJSON objects already handels it well
    */
   
    fmt.Println("TEST GetData")
    fmt.Println(wsMsg.Data.Name)
    if wsMsg.Data.ID == "" {
        return types.ContainerJSON{}, fmt.Errorf("No data has been found!")
    } 
       
    return wsMsg.Data, nil


}
