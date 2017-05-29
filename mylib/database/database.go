package database

import (
	"database/sql"
	"fmt"

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
