package main

import (
	"github.com/kadirtikil/clustermonitor/controllers"
	"github.com/kadirtikil/clustermonitor/fetcher"
	"github.com/kadirtikil/clustermonitor/initializers"
	"github.com/kadirtikil/clustermonitor/middleware"
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

	/*
		server stuff below
	*/
	httpMux := http.NewServeMux()

	listeningPort := ":8080"
	server := http.Server{
		Handler: httpMux,
		Addr:    listeningPort,
	}

	/**
	account routes
	these are always exposed
	*/
	httpMux.HandleFunc("POST /signup", controllers.SignUp)
	httpMux.HandleFunc("POST /login", controllers.Login)
	httpMux.HandleFunc("POST /logout", controllers.Logout)

	// this route is used for view changes in the react client
	// it checks wether the cookie the client has contains a valid jwt
	// that way, we check before switch, so the client can only see the dashboard,
	// with a valid jwt
	// the function itself is also used in the middleware
	// and will play a central part in the authorization mechanism later on
	httpMux.HandleFunc("POST /checkAuth", controllers.CheckAuth)

	/**
	  websocket route

	*/
	// This route is only reachable with a valid jwt
	// therefore wrapped in middleware CheckJWT which checks it for every request regarding the websocket
	httpMux.HandleFunc("/ws", middleware.CheckJWT(ws.WsHandler))

	/**
	I could ger rid of these since the whole communication runs on the websocket
	I think i wil lonly use fetch to show non users, what containers are running
	*/
	httpMux.HandleFunc("GET /fetchcontainers", fetcher.HttpFetcher)

	// these routes are not necessary anymore since the websockets connection now handles all of them
	// NEVER uncomment these
	/* httpMux.HandleFunc("POST /restartcontainer", dockeroperations.HttpRestartContainer)
	httpMux.HandleFunc("POST /pausecontainer", dockeroperations.HttpPauseContainer)
	httpMux.HandleFunc("POST /removecontainer", dockeroperations.HttpRemoveContainer)
	httpMux.HandleFunc("POST /killcontainer", dockeroperations.HttpKillContainer) */

	fmt.Printf("Server is listening on port %s\n", listeningPort)
	log.Fatal(server.ListenAndServe())

}
