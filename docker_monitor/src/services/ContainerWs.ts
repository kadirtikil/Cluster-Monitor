import { useState } from "react";
import useWebSocket from "react-use-websocket";


export const useContainerWsConnection = (url: string) => {

    const [wsUrl, setWsUrl] = useState(url)

    const {sendJsonMessage, lastJsonMessage, readyState, lastMessage} = useWebSocket(wsUrl,
       { 
        onMessage: () => {
            console.log(lastJsonMessage.data)
        }
    })


    const sendJsonMsg= (action: string, id: string) => {
        const payload = {
            "action": action,
            "id": id
        }
        sendJsonMessage(payload)
    }


    return {
        sendJsonMsg,
        lastJsonMessage,
        readyState,
        lastMessage,
    }


}

