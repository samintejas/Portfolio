package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"

	"samin.dev/portfolio/internals/config"
	"samin.dev/portfolio/internals/constants"
)

func main() {

	fmt.Println(constants.BANNER)
	config.Init()
	http.HandleFunc("/", homeHandler)

	fs := http.FileServer(http.Dir("resources/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	log.Printf("starting server on port %s", config.App.Port)
	err := http.ListenAndServe(":"+config.App.Port, nil)

	if err != nil {
		log.Fatal(err)
	}

}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "home")
}

func renderTemplate(w http.ResponseWriter, templ string) {
	parsedTemplate, err := template.ParseFiles("resources/templates/" + templ + ".html")
	if err != nil {
		http.Error(w, "Error parsing template", http.StatusInternalServerError)
		return
	}
	err = parsedTemplate.Execute(w, nil)
	if err != nil {
		http.Error(w, "Error executing template", http.StatusInternalServerError)
		return
	}
}
