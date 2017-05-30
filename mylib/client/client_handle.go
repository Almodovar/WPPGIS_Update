package client

import (
	"WPPGIS_Update/mylib/database"
	"WPPGIS_Update/mylib/scenario"
	"WPPGIS_Update/mylib/session"
	"WPPGIS_Update/mylib/tmpl"
	"strings"

	"os"

	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func Authorization(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var client = new(Client)
	var message = "USERNAME WARNING!"
	err := json.NewDecoder(r.Body).Decode(&client)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	fmt.Println(client.Id, client.Name, client.Password)

	c, e := FindByName(client.Name)
	if e != nil {
		if e == sql.ErrNoRows {
			message = "USERNAME WARNING!"
		} else {
			log.Fatal(e)
		}
	} else {
		switch {
		case c.Password != client.Password:
			message = "PASSWORD WARNING!"
		case c.Role == "admin":
			message = "adminAccept"
		case c.Role == "client":
			message = "clientAccept"
			s := session.FindOrCreateSession(w, r)
			s.ClientID = c.Id
			session.Store.Save(s)
		}
	}
	a, err := json.Marshal(message)
	if err != nil {
		panic(err)
	}
	w.Write(a)
}

func GetScenarioList(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	var clientName = p.ByName("client")
	var path = "client/" + p.ByName("client")
	s := session.RequestSession(r)
	fmt.Println(s)
	if s == nil {
		http.Redirect(w, r, "/login", 301)
	} else {
		if _, err := os.Stat(path); os.IsNotExist(err) {
			os.MkdirAll(path, 0777)
		}
		scenarios := scenario.GetScenariosByClient(clientName)
		tmpl.RenderTemplate(w, r, "list", scenarios)
	}
}

func GetFieldByClientName(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var fieldsByClient = new(ClientFields)
	var clientName string
	err := json.NewDecoder(r.Body).Decode(&clientName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	clientName = strings.TrimSpace(clientName)

	c, e := FindByName(clientName)
	if e != nil {
		panic(e)
	}

	fieldsByClient.Client = c

	pgDB := database.ConnectToPostGRE()
	defer pgDB.Close()

	rows, err := pgDB.Query("select fid from client_field where uid = $1", c.Id)
	for rows.Next() {
		var fieldId int
		rows.Scan(&fieldId)
		fieldsByClient.Fields = append(fieldsByClient.Fields, fieldId)
	}

	a, err := json.Marshal(fieldsByClient)
	if err != nil {
		panic(err)
	}
	w.Write(a)
}
