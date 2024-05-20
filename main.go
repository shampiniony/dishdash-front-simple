package main

import (
	"log"
	"net/http"
)

func main() {
	staticDir := "./static"
	fs := http.FileServer(http.Dir(staticDir))
	http.Handle("GET /", fs)
	http.HandleFunc("GET /swipe/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/swipe.html")
	})
	port := ":8080"
	log.Printf("Сервер запущен на http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}
