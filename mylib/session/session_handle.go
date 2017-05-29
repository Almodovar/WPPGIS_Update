package session

import (
	"WPPGIS_Update/mylib/tools"
	"net/http"
	"time"
)

const (
	// Keep users logged in for 3 days
	sessionLength     = 1 * 24 * time.Hour
	sessionCookieName = "WPPGIS"
	sessionIDLength   = 20
)

func NewSession(w http.ResponseWriter) *Session {
	expiry := time.Now().Add(sessionLength)

	session := &Session{
		ID:     tools.GenerateID("sess", sessionIDLength),
		Expiry: expiry,
	}

	cookie := http.Cookie{
		Name:    sessionCookieName,
		Value:   session.ID,
		Expires: session.Expiry,
	}

	http.SetCookie(w, &cookie)
	return session
}

func RequestSession(r *http.Request) *Session {
	cookie, err := r.Cookie(sessionCookieName)
	if err != nil {
		return nil
	}

	session, err := Store.Find(cookie.Value)
	if err != nil {
		panic(err)
	}

	if session == nil {
		return nil
	}

	if session.Expired() {
		Store.Delete(session)
		return nil
	}
	return session
}

func FindOrCreateSession(w http.ResponseWriter, r *http.Request) *Session {
	session := RequestSession(r)
	if session == nil {
		session = NewSession(w)
	}
	return session
}

func (session *Session) Expired() bool {
	return session.Expiry.Before(time.Now())
}
