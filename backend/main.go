// main.go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

// CORSミドルウェア
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// プリフライトリクエストの処理
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5001"
	}

	mux := http.NewServeMux()

	// 静的ファイルを提供
	fs := http.FileServer(http.Dir("./audio"))
	mux.Handle("/audio/", http.StripPrefix("/audio/", fs))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Server is running")
	})

	// CORSミドルウェアを適用
	handler := enableCORS(mux)

	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}