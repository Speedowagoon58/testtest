package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
    fs := http.FileServer(http.Dir("static"))
    http.Handle("/", fs)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Server is running on port %s", port)
    err := http.ListenAndServe(":"+port, nil)
    if err != nil {
        log.Fatal(err)
    }
}