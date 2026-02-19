.PHONY: help dev build build-css build-css-watch build-rust clean run release install-deps

help:
	@echo "Available targets:"
	@echo "  make run          " 
	@echo "  make watch-css    " 
	@echo "  make build-css    " 
	@echo "  make build        "
	@echo "  make release      " 
	@echo "  make clean        " 
	@echo "  make install-deps " 

run:
	@echo "Starting development mode..."
	@echo "Run 'make build-css-watch' in another terminal for CSS hot-reload"
	cargo run

watch-css:
	tailwindcss -i ./static/css/global.css -o ./static/css/style.css --watch

build-css:
	@echo "Building Tailwind CSS (minified)..."
	tailwindcss -i ./static/css/global.css -o ./static/css/style.css --minify
	@echo "✓ CSS built successfully"

build: build-css
	@echo "Building Rust binary (debug)..."
	cargo build
	@echo "✓ Rust binary built successfully"

release: build-css
	@echo "Building optimized release..."
	cargo build --release
	@echo "✓ Release binary: ./target/release/$(shell grep '^name' Cargo.toml | cut -d'"' -f2)"

clean:
	@echo "Cleaning build artifacts..."
	cargo clean
	rm -f ./static/css/style.css
	@echo "✓ Clean complete"

install-deps:
	@echo "Install dependencies manually... [INTENTIONAL]"
	@echo "intall rust toolkit"
	@echo "install tailwindcli"
