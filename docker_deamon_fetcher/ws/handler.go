package ws



import (
    "log"
    "fmt"
    "net/http"
    "encoding/json"

    "github.com/gorilla/websocket"

    // "github.com/kadirtikil/clustermonitor/dockeroperations"
)


var upgrader = websocket.Upgrader{
    ReadBufferSize: 1024,
    WriteBufferSize: 1024,
    // just let anyone work here
    // no cors policies
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}



/** 
    this is where the magic happens.
    we now turn our http connection into a bidirectional websocket connection.
    this way, we can use event driven triggers to check for changes and dont have to initiate everything.
*/
func WsHandler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println("Error trying to upgrade to websocket connection: ", err)
        return
    }

    defer conn.Close()

    /** 
        The loop that acts as the watchdog for the socket.
        Now we keep watching for anything entering through ths connection
    */

    for {
        // the msg has to be of type conn basically
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            log.Println("Error trying to read the message: ", err)
            return
        }

        // based on msg, do whatever here.
        // match patterns or whatever

        var wsMsg WsMsg 
        if err := json.Unmarshal(p, &wsMsg); err != nil {
            fmt.Println(err)
        }
        
            
        // now we got the container and the action so we can map both to the method
        
        if _, err := WsDockerOperation(wsMsg); err != nil {
            log.Println("Error trying to match the action to validated ones in wsHandler: ", err)
            return
        } 
        
    
    

        // send the if we are not able to read the message, back to the client
        if err := conn.WriteMessage(messageType, p); err != nil {
            log.Println("Error trying to let the client know we failed to read the message: ", err)
            return
        }

         
        fmt.Println(wsMsg.GetAction())
    }
}
