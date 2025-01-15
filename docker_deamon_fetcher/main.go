package main


import (
    "docker_deamon_fetcher/fetcher"

    "docker_deamon_fetcher/docker_operations"
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

    httpMux.HandleFunc("GET /fetchcontainers", fetcher.HttpFetcher)
    httpMux.HandleFunc("POST /restartcontainer", dockeroperations.HttpRestartContainer)
    httpMux.HandleFunc("POST /pausecontainer", dockeroperations.HttpPauseContainer)
    httpMux.HandleFunc("POST /removecontainer", dockeroperations.HttpRemoveContainer)
    httpMux.HandleFunc("POST /killcontainer", dockeroperations.HttpKillContainer)


    fmt.Printf("Server is listening on port: %s\n", listeningPort)
    log.Fatal(server.ListenAndServe())

}
