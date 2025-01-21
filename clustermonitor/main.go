package main

import (
	"github.com/kadirtikil/clustermonitor/controllers"
	"github.com/kadirtikil/clustermonitor/dockeroperations"
	"github.com/kadirtikil/clustermonitor/fetcher"
	"github.com/kadirtikil/clustermonitor/initializers"
	"github.com/kadirtikil/clustermonitor/ws"

	"fmt"
	"log"
	"net/http"
)

func init() {
	initializers.LoadEnv()

	initializers.DbConnect()

	initializers.MigrateUser()
}

func main() {

	httpMux := http.NewServeMux()

	listeningPort := ":8080"
	server := http.Server{
		Handler: httpMux,
		Addr:    listeningPort,
	}

	/**
	signup route
	*/
	httpMux.HandleFunc("POST /signup", controllers.SignUp)
	httpMux.HandleFunc("POST /login", controllers.Login)

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
