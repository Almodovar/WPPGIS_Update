package client

import (
	"WPPGIS_Update/mylib/database"
)

type Client struct {
	Id       int
	Name     string
	Password string
	Role     string
	Email    string
}

func FindById(id int) (*Client, error) {
	pgDB := database.ConnectToPostGRE()
	defer pgDB.Close()

	var client = new(Client)

	err := pgDB.QueryRow("select uid, uname, role, password, email from client where uid = $1", id).Scan(&client.Id, &client.Name, &client.Role, &client.Password, &client.Email)
	if err != nil {
		return nil, err
	}
	return client, nil
}

func FindByName(name string) (*Client, error) {
	pgDB := database.ConnectToPostGRE()
	defer pgDB.Close()

	var client = new(Client)

	err := pgDB.QueryRow("select uid, uname, role, password, email from client where uname = $1", name).Scan(&client.Id, &client.Name, &client.Role, &client.Password, &client.Email)
	if err != nil {
		return nil, err
	}
	return client, nil
}

// func RequestUser(r *http.Request) *client.Client {
// 	session := RequestSession(r)
// 	if session == nil || session.ClientID == "" {
// 		return nil
// 	}

// 	client, err := client.FindById(session.ClientID)
// 	if err != nil {
// 		panic(err)
// 	}
// 	return client
// }
