package database

import (
	"database/sql"
	"fmt"
	"strconv"

	_ "github.com/lib/pq"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "postgre"
	DB_NAME     = "wppgis"
)

func ConnectToPostGRE() *sql.DB {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	if err != nil {
		panic(err)
	}
	return db
}

func GetFieldByClientId(id int) []int {
	var field []int
	var postgreConnection = ConnectToPostGRE()
	defer postgreConnection.Close()
	rows, err := postgreConnection.Query("select field_id from gully_agri_clip_144_filledfarmerdata where prod_id = " + strconv.Itoa(id))
	checkErr(err)
	for rows.Next() {
		var fieldID int
		err = rows.Scan(&fieldID)
		checkErr(err)
		field = append(field, fieldID)
	}
	fmt.Println(field)
	return field
}

func GetFieldByClientName(name string) []int {
	var uid int
	var field []int
	var postgreConnection = ConnectToPostGRE()
	defer postgreConnection.Close()

	rows, err := postgreConnection.Query("select uid, name from client")
	for rows.Next() {
		var id int
		var n string
		err = rows.Scan(&id, &n)
		checkErr(err)
		if n == name {
			uid = id
		}
	}

	rows, err = postgreConnection.Query("select field_id from gully_agri_clip_144_filledfarmerdata where prod_id = " + strconv.Itoa(uid))
	checkErr(err)
	for rows.Next() {
		var fieldID int
		err = rows.Scan(&fieldID)
		checkErr(err)
		field = append(field, fieldID)
	}
	fmt.Println(field)
	return field
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
