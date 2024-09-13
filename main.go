package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
)

type Project struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageURL    string `json:"imageURL"`
	Link        string `json:"link"`
}

type ProjectsConfig struct {
	Projects []Project `json:"projects"`
}

type PersonalDetails struct {
	Name        string `json:"name"`
	Title       string `json:"title"`
	Photo       string `json:"photo"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Location    string `json:"location"`
	ShortBio    string `json:"shortBio"`
	LongBio     string `json:"longBio"`
	SocialLinks struct {
		Github   string `json:"github"`
		Linkedin string `json:"linkedin"`
		Spotify  string `json:"spotify"`
	} `json:"socialLinks"`
}

type PageDetail struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type SiteConfig struct {
	SiteTitle       string                `json:"siteTitle"`
	Favicon         string                `json:"favicon"`
	PersonalDetails PersonalDetails       `json:"personalDetails"`
	PageDetails     map[string]PageDetail `json:"pageDetails"`
}

type PageData struct {
	SiteConfig SiteConfig
	PageName   string
	Projects   []Project
}

var projectsConfig ProjectsConfig
var siteConfig SiteConfig

func init() {
	loadProjectsConfig()
	loadSiteConfig()
}

func loadProjectsConfig() {
	file, err := os.ReadFile("config/projects.json")
	if err != nil {
		log.Fatal("Error reading projects config file:", err)
	}

	err = json.Unmarshal(file, &projectsConfig)
	if err != nil {
		log.Fatal("Error parsing projects config:", err)
	}
}

func loadSiteConfig() {
	file, err := os.ReadFile("config/portfolio.json")
	if err != nil {
		log.Fatal("Error reading site config file:", err)
	}

	err = json.Unmarshal(file, &siteConfig)
	if err != nil {
		log.Fatal("Error parsing site config:", err)
	}
}

func main() {

	http.HandleFunc("/", homePage)
	http.HandleFunc("/about", aboutPage)
	http.HandleFunc("/projects", projectsPage)
	http.HandleFunc("/contact", contactPage)

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static"+siteConfig.Favicon)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func renderTemplate(w http.ResponseWriter, tmpl string, data PageData) {
	templates := template.Must(template.ParseFiles(
		"templates/layout.html",
		"templates/"+tmpl+".html",
	))

	err := templates.ExecuteTemplate(w, "layout", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func homePage(w http.ResponseWriter, r *http.Request) {
	data := PageData{
		SiteConfig: siteConfig,
		PageName:   "home",
	}
	renderTemplate(w, "home", data)
}

func aboutPage(w http.ResponseWriter, r *http.Request) {
	data := PageData{
		SiteConfig: siteConfig,
		PageName:   "about",
	}
	renderTemplate(w, "about", data)
}

func projectsPage(w http.ResponseWriter, r *http.Request) {
	data := PageData{
		SiteConfig: siteConfig,
		PageName:   "projects",
		Projects:   projectsConfig.Projects,
	}
	renderTemplate(w, "projects", data)
}

func contactPage(w http.ResponseWriter, r *http.Request) {
	data := PageData{
		SiteConfig: siteConfig,
		PageName:   "contact",
	}
	renderTemplate(w, "contact", data)
}
