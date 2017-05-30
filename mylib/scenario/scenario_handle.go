package scenario

import (
	"WPPGIS_Update/mylib/database"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"reflect"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func Create(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	scenario := new(Scenario)
	err := json.NewDecoder(r.Body).Decode(&scenario)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	pgDB := database.ConnectToPostGRE()
	defer pgDB.Close()

	var sid int
	// 	sqlStatement := `
	// INSERT INTO scenario (sname, sdescription, screation, uname)
	// VALUES ($1, $2, $3, $4)`
	// 	_, err = pgDB.Exec(sqlStatement, scenario.Name, scenario.Description, scenario.CreatedAt, scenario.ClientName)
	// 	if err != nil {
	// 		panic(err)
	// 	}
	err = pgDB.QueryRow("INSERT INTO scenario (sname, sdescription, screation, uname) VALUES ($1, $2, $3, $4) returning sid;", scenario.Name, scenario.Description, scenario.CreatedAt, scenario.ClientName).Scan(&sid)
	scenario.Id = sid
	fmt.Println(scenario.CreatedAt)
	path := "client/" + scenario.ClientName + "/" + scenario.Name + "_" + strconv.Itoa(scenario.Id)
	fmt.Println(path)
	if _, err := os.Stat(path); os.IsNotExist(err) {
		os.MkdirAll(path, 0777)
	}
	a, err := json.Marshal(scenario)
	if err != nil {
		panic(err)
	}
	w.Write(a)
}

func Delete(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var scenarioId int
	err := json.NewDecoder(r.Body).Decode(&scenarioId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	fmt.Println(scenarioId, reflect.TypeOf(scenarioId))
	pgDB := database.ConnectToPostGRE()
	defer pgDB.Close()
	stmt, err := pgDB.Prepare("delete from scenario where sid=$1")
	if err != nil {
		panic(err)
	}
	_, err = stmt.Exec(scenarioId)
	if err != nil {
		panic(err)
	}
	a, err := json.Marshal("Scenario is deleted!")
	if err != nil {
		panic(err)
	}
	w.Write(a)
}

func Update() {

}

func GetScenariosByClient(c string) *ScenarioByClient {
	var scenarios = new(ScenarioByClient)
	scenarios.ClientName = c
	pgDB := database.ConnectToPostGRE()
	defer pgDB.Close()
	rows, err := pgDB.Query("select sid, sname, sdescription, screation, status from scenario where uname = $1", c)
	if err != nil {
		panic(err)
	}
	for rows.Next() {
		scenario := new(Scenario)
		err := rows.Scan(
			&scenario.Id,
			&scenario.Name,
			&scenario.Description,
			&scenario.CreatedAt,
			&scenario.Status,
		)
		if err != nil {
			panic(err)
		}

		scenarios.Scenarios = append(scenarios.Scenarios, scenario)
	}
	return scenarios
}

func GetScenarioById(id int) *Scenario {
	var scenario = new(Scenario)
	pgDB := database.ConnectToPostGRE()
	defer pgDB.Close()

	err := pgDB.QueryRow("select sid, sname, sdescription, screation, uname, status from scenario where sid = $1", id).Scan(&scenario.Id, &scenario.Name, &scenario.Description, &scenario.CreatedAt, &scenario.ClientName, &scenario.Status)
	if err != nil {
		panic(err)
	}
	scenario.Id = id
	return scenario
}
