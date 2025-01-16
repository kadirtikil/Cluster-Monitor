package ws

import (
    "fmt"

    "docker_deamon_fetcher/utils"
)

// only valid actions are these
var validActions = []string{
    "fetch", "restart", "kill", "remove", "pause",
}

var validRunes = []rune{}

type WsMsg struct {
    Action string   `json:"action"`
    Data string     `json:"data"`
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


func (wsMsg *WsMsg) GetData() (map[string]interface{}, error) {
    /** 
        TODO: 
            - check if data is not empty
            - check if data can be unmarsheled into an object with docker container metadata
    */

    if wsMsg.Data == "" {
        return nil, fmt.Errorf("No data has been found!")
    }

    return nil, nil


}
