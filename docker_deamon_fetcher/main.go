package main


import (
    "github.com/kadirtikil/clustermonitor/ws"
    "github.com/kadirtikil/clustermonitor/fetcher"
    "github.com/kadirtikil/clustermonitor/dockeroperations"

    "fmt"
    "log"
    "net/http"

)





func main() {
   

    httpMux := http.NewServeMux()
    
    listeningPort := ":8080"
    server := http.Server{
        Handler: httpMux,
        Addr: listeningPort,
    }


    /** 
        websocket route
    */
    httpMux.HandleFunc("/ws", ws.WsHandler)

    httpMux.HandleFunc("GET /fetchcontainers", fetcher.HttpFetcher)
    httpMux.HandleFunc("POST /restartcontainer", dockeroperations.HttpRestartContainer)
    httpMux.HandleFunc("POST /pausecontainer", dockeroperations.HttpPauseContainer)
    httpMux.HandleFunc("POST /removecontainer", dockeroperations.HttpRemoveContainer)
    httpMux.HandleFunc("POST /killcontainer", dockeroperations.HttpKillContainer)


    fmt.Printf("Server is listening on port: %s\n", listeningPort)
    log.Fatal(server.ListenAndServe())

}
