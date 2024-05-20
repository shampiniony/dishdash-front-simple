package main

import (
	"log"
	"net/http"
)

func main() {
	staticDir := "./static"
	fs := http.FileServer(http.Dir(staticDir))
	http.Handle("/", fs)
	port := ":8080"
	log.Printf("Сервер запущен на http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}
