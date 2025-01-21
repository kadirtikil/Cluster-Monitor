package ws

import (
	"fmt"

	"github.com/kadirtikil/clustermonitor/utils"
)

// only valid actions are these
var validActions = []string{
	"fetch", "restart", "kill", "remove", "pause",
}

type WsMsg struct {
	Action string `json:"action"`
	Id     string `json:"id"`
}

func (wsMsg *WsMsg) GetAction() (string, error) {
	action := "invalid"

	validRunes := utils.GetRunesOfStringSlice(validActions)

	if wsMsg.Action == "" {
		return "", fmt.Errorf("no actions have been found in the msg")
	}

	for _, r := range wsMsg.Action {
		if !utils.ContainsRuneArr(validRunes, r) {
			return "", fmt.Errorf("action contains invalid runes")
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
	return "", fmt.Errorf("nothings worked in getaction function")
}
