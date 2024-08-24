package config

import (
	"log"
	"os"
	"strconv"
	"sync"
)

var loaded sync.Once
var App *AppConfigs
var MySQL *MySQLConfigs

func Init() {
	loaded.Do(func() {
		loadConfig()
	})
}

type AppConfigs struct {
	Port           string
	PerfomanceMode bool
	GodMode        bool
}

type MySQLConfigs struct {
	Url             string
	Port            string
	Database        string
	User            string
	Password        string
	Network         string
	AllowNativePass bool
	ParseTime       bool
}

func loadConfig() {

	App = &AppConfigs{
		Port:           loadString("PRT_APP_PORT", "8080"),
		PerfomanceMode: loadBool("PRT_APP_PERF_MODE", false),
		GodMode:        loadBool("PRT_APP_GOD_MODE", false),
	}

	MySQL = &MySQLConfigs{
		Url:             loadString("PRT_MYSQL_URL", "127.0.0.1"),
		Port:            loadString("PRT_MYSQL_PORT", "3306"),
		Database:        loadString("PRT_MYSQL_DATABASE", "pxdt_menu"),
		User:            loadString("PRT_MYSQL_USER", "samin"),
		Password:        loadString("PRT_MYSQL_PASS", "1"),
		Network:         loadString("PRT_MYSQL_NET", "tcp"),
		AllowNativePass: loadBool("PRT_MYSQL_ANP", true),
		ParseTime:       loadBool("PRT_MYSQL_PT", true),
	}
}

func loadString(key, def string) string {
	value := os.Getenv(key)
	if value == "" {
		return def
	}
	return value
}

func loadBool(key string, def bool) bool {
	value := os.Getenv(key)
	if value == "" {
		return def
	}
	boolValue, err := strconv.ParseBool(value)
	if err != nil {
		log.Fatalf("bad boolean config , please fix the env variable %s", key)
	}
	return boolValue
}
