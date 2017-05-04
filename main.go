package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"

	_ "github.com/lib/pq"
)

var templates = template.Must(template.New("t").ParseGlob("static/**/*.html"))

type Client struct {
	Name     string
	Password string
	Role     string
}

func main() {

	router := http.NewServeMux()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		renderTemplate(w, r, "index", nil)
	})
	router.HandleFunc("/public/", func(w http.ResponseWriter, r *http.Request) {
		renderTemplate(w, r, "public", nil)
	})
	router.HandleFunc("/login/", func(w http.ResponseWriter, r *http.Request) {
		renderTemplate(w, r, "login", nil)
	})

	router.HandleFunc("/administration/", func(w http.ResponseWriter, r *http.Request) {
		renderTemplate(w, r, "administration", nil)
	})

	router.HandleFunc("/redirect", func(w http.ResponseWriter, r *http.Request) {
		var client = new(Client)
		var errorMessage = "USERNAME WARNING!"
		err := json.NewDecoder(r.Body).Decode(&client)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		db, err := sql.Open("postgres", "user=postgres password=postgre dbname=wppgis sslmode=disable")
		if err != nil {
			panic(err)
		}
		rows, err := db.Query("select name, role, password from client")
		if err != nil {
			panic(err)
		}
		for rows.Next() {
			var name string
			var role string
			var password string
			err = rows.Scan(&name, &role, &password)
			if err != nil {
				panic(err)
			}
			// fmt.Println(client.Name, client.Password)
			// fmt.Println(name, role, password)
			if name == client.Name && password == client.Password {
				client.Role = role
				fmt.Println(client.Role)
				if client.Role == "admin" {
					errorMessage = "adminAccept"
				}
				if client.Role == "client" {
					errorMessage = "clientAccept"
				}
			}
			if name == client.Name && password != client.Password {
				errorMessage = "PASSWORD WARNING!"
			}
		}

		a, err := json.Marshal(errorMessage)
		if err != nil {
			panic(err)
		}
		w.Write(a)
	})

	router.HandleFunc("/runmodel", HandleModelRun)
	router.HandleFunc("/chart", HandleChart)
	router.HandleFunc("/drawecooutletchart", HandleEcoOutletChart)

	router.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static/"))))
	http.ListenAndServe(":8080", router)
}

func renderTemplate(w http.ResponseWriter, r *http.Request, name string, data interface{}) {
	err := templates.ExecuteTemplate(w, name+".html", data)
	if err != nil {
		http.Error(w, fmt.Sprintf(errorTemplate, name, err), http.StatusInternalServerError)
	}
}

var errorTemplate = `<html>
<body>
<h1>Error rendering template %s</h1>
<p>%s</p>
</body>
</html>`
