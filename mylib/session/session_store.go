package session

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

type SessionStore interface {
	Find(string) (*Session, error)
	Save(*Session) error
	Delete(*Session) error
}

type FileSessionStore struct {
	filename string
	Sessions map[string]Session
}

var Store *FileSessionStore

func init() {
	Store = NewFileSessionStore("sessions.txt")
}

func NewFileSessionStore(name string) *FileSessionStore {
	store := &FileSessionStore{
		Sessions: map[string]Session{},
		filename: name,
	}

	contents, err := ioutil.ReadFile(name)

	if os.IsNotExist(err) {
		return store
	}

	err = json.Unmarshal(contents, store)
	if err != nil {
		panic(err)
	}
	return store
}

func (s *FileSessionStore) Find(id string) (*Session, error) {
	session, exists := s.Sessions[id]
	if !exists {
		return nil, nil
	}
	return &session, nil
}

func (store *FileSessionStore) Save(session *Session) error {
	store.Sessions[session.ID] = *session
	contents, err := json.MarshalIndent(store, "", "  ")
	if err != nil {
		return err
	}
	return ioutil.WriteFile(store.filename, contents, 0660)
}

func (store *FileSessionStore) Delete(session *Session) error {
	delete(store.Sessions, session.ID)
	contents, err := json.MarshalIndent(store, "", "  ")
	if err != nil {
		return err
	}
	return ioutil.WriteFile(store.filename, contents, 0660)
}
