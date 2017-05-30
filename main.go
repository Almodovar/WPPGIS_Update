package main

import (
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"

	"WPPGIS_Update/mylib/client"
	"WPPGIS_Update/mylib/scenario"
	"WPPGIS_Update/mylib/tmpl"

	_ "github.com/lib/pq"
)

// Parse and check the templates

func main() {

	// A multicomplexer created by the httprouter
	mux := httprouter.New()

	// Serve the static file
	// mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static/"))))
	mux.ServeFiles(
		"/static/*filepath",
		http.Dir("static/"),
	)

	// Patterns and Handler functions
	mux.GET("/", func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		tmpl.RenderTemplate(w, r, "index", nil)
	})
	mux.GET("/public/", func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		tmpl.RenderTemplate(w, r, "public", nil)
	})
	mux.GET("/login/", func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		tmpl.RenderTemplate(w, r, "login", nil)
	})

	mux.GET("/administration/", func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		tmpl.RenderTemplate(w, r, "administration", nil)
	})

	mux.GET("/sandbox/:client/:scenario", func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		var scenarioId, _ = strconv.Atoi(p.ByName("scenario"))
		var scenario = scenario.GetScenarioById(scenarioId)
		tmpl.RenderTemplate(w, r, "sandbox", scenario)
	})

	mux.POST("/authorization", client.Authorization)
	mux.POST("/scenariocreation", scenario.Create)
	mux.POST("/scenariodeletion", scenario.Delete)
	mux.POST("/getfield", client.GetFieldByClientName)

	mux.GET("/list/:client", client.GetScenarioList)

	// mux.GET("/runmodel", HandleModelRun)
	// mux.GET("/chart", HandleChart)
	// mux.GET("/drawecooutletchart", HandleEcoOutletChart)

	// mux.GET("/getlowerupperlimites", HandleOptimizationLimites)
	// mux.GET("/runoptimizationmodel", HandleOptimizationRun)

	// Configure the multicomplexer
	// 8080 is the default port of Go server
	// mux implements the ServeHTTP interface and by default match patterns with the handler

	server := http.Server{
		Addr:    "127.0.0.1:8080",
		Handler: mux,
	}
	server.ListenAndServe()

}
