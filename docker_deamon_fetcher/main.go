package main


import (
    "docker_deamon_fetcher/fetcher"
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

    fmt.Printf("Server is listening on port: %s\n", listeningPort)
    log.Fatal(server.ListenAndServe())

}
