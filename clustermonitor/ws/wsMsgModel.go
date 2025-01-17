package ws

import (
    "fmt"

    "github.com/kadirtikil/clustermonitor/utils"
)

// only valid actions are these
var validActions = []string{
    "fetch", "restart", "kill", "remove", "pause",
}

var validRunes = []rune{}

type WsMsg struct {
	Action  string `json:"action"`
	Id      string `json:"id"`
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
        return "", fmt.Errorf("No actions have been found in the msg!")
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
    return "", fmt.Errorf("The fit aint it!")
}
