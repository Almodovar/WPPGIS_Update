package session

import "time"

type Session struct {
	ID       string
	ClientID int
	Expiry   time.Time
}
