.PHONY: help run watch-css build-css build release clean install-deps

help:
	@echo "run          - start dev server"
	@echo "watch-css    - rebuild CSS on file change"
	@echo "build-css    - build and minify CSS"
	@echo "build        - build CSS + debug binary"
	@echo "release      - build CSS + release binary"
	@echo "clean        - remove build artifacts"
	@echo "install-deps - show required dependencies"

run:
	cargo run

watch-css:
	tailwindcss -i ./static/css/global.css -o ./static/css/style.css --watch

build-css:
	tailwindcss -i ./static/css/global.css -o ./static/css/style.css --minify

build: build-css
	cargo build

release: build-css
	cargo build --release

clean:
	cargo clean
	rm -f ./static/css/style.css

install-deps:
	@echo "rust: https://rustup.rs"
	@echo "tailwindcss: https://tailwindcss.com/docs/installation"
