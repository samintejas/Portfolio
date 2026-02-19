use axum::{Router, http::HeaderMap, response::Html, routing::get};
use std::fs;
use tower_http::services::ServeDir;

mod blog;

fn render(page: &str, headers: &HeaderMap) -> Html<String> {
    let content = fs::read_to_string(format!("static/{page}")).unwrap();

    if headers.contains_key("hx-request") {
        return Html(content);
    } else {
        let layout = fs::read_to_string("static/root.html").unwrap();
        return Html(layout.replace("{{content}}", &content));
    }
}

fn render_html(content: String, headers: &HeaderMap) -> Html<String> {
    if headers.contains_key("hx-request") {
        Html(content)
    } else {
        let layout = fs::read_to_string("static/root.html").unwrap();
        Html(layout.replace("{{content}}", &content))
    }
}

async fn home(headers: HeaderMap) -> Html<String> {
    render("info.html", &headers)
}

async fn lab(headers: HeaderMap) -> Html<String> {
    render("lab.html", &headers)
}

async fn sounds(headers: HeaderMap) -> Html<String> {
    render("sounds.html", &headers)
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(home))
        .route("/blog", get(blog))
        .route("/blog/{slug}", get(blog_post))
        .route("/lab", get(lab))
        .route("/sounds", get(sounds))
        .nest_service("/css", ServeDir::new("static/css"))
        .nest_service("/img", ServeDir::new("static/img"));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    println!("Listening ..");
    axum::serve(listener, app).await.unwrap();
}
