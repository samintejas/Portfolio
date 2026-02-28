use axum::{
    Router,
    extract::{Path, State},
    http::{HeaderMap, HeaderValue, header},
    response::Html,
    routing::get,
};
use std::sync::Arc;
use tower::ServiceBuilder;
use tower_http::{
    compression::CompressionLayer, services::ServeDir, set_header::SetResponseHeaderLayer,
};

use crate::{article::Article, template::Template};

mod article;
mod template;

struct AppState {
    template: Template,
    articles: Article,
}

fn render_html(content: String, headers: &HeaderMap, template: &Template) -> Html<String> {
    if headers.contains_key("hx-request") {
        Html(content)
    } else {
        Html(template.page.root.replace("{{content}}", &content))
    }
}

async fn home(State(state): State<Arc<AppState>>, headers: HeaderMap) -> Html<String> {
    render_html(state.template.page.info.clone(), &headers, &state.template)
}

async fn lab(State(state): State<Arc<AppState>>, headers: HeaderMap) -> Html<String> {
    render_html(state.template.page.lab.clone(), &headers, &state.template)
}

async fn sounds(State(state): State<Arc<AppState>>, headers: HeaderMap) -> Html<String> {
    render_html(
        state.template.page.sounds.clone(),
        &headers,
        &state.template,
    )
}

async fn article_listing(State(state): State<Arc<AppState>>, headers: HeaderMap) -> Html<String> {
    let mut cards = String::new();

    for post in &state.articles.listing {
        let date_topic = if post.topic.is_empty() {
            post.date.clone()
        } else {
            format!("{} · {}", post.date, post.topic)
        };
        let description = if post.description.is_empty() {
            String::new()
        } else {
            post.description.clone()
        };

        let card = state
            .template
            .component
            .article_card
            .replace("{{slug}}", &post.slug)
            .replace("{{title}}", &post.title)
            .replace("{{date_topic}}", &date_topic)
            .replace("{{description}}", &description);

        cards.push_str(&card);
    }

    let html = state.template.page.article.replace("{{cards}}", &cards);
    render_html(html, &headers, &state.template)
}

async fn article(
    State(state): State<Arc<AppState>>,
    Path(path): Path<String>,
    headers: HeaderMap,
) -> Html<String> {
    match state.articles.posts.get(&path) {
        Some(content) => {
            let html = format!("<article class=\"prose\">{}</article>", content);
            render_html(html, &headers, &state.template)
        }
        None => render_html(
            "<h2>Post not found</h2>".to_string(),
            &headers,
            &state.template,
        ),
    }
}

#[tokio::main]
async fn main() {
    let state = Arc::new(AppState {
        template: template::load_template(),
        articles: article::load_articles(),
    });

    let app = Router::new()
        .route("/", get(home))
        .route("/article", get(article_listing))
        .route("/article/{*path}", get(article))
        .route("/lab", get(lab))
        .route("/sounds", get(sounds))
        .nest_service(
            "/css",
            ServiceBuilder::new()
                .layer(CompressionLayer::new())
                .layer(SetResponseHeaderLayer::if_not_present(
                    header::CACHE_CONTROL,
                    HeaderValue::from_static("public, max-age=2592000"),
                ))
                .service(ServeDir::new("static/css")),
        )
        .nest_service(
            "/js",
            ServiceBuilder::new()
                .layer(CompressionLayer::new())
                .layer(SetResponseHeaderLayer::if_not_present(
                    header::CACHE_CONTROL,
                    HeaderValue::from_static("public, max-age=2592000"),
                ))
                .service(ServeDir::new("static/js")),
        )
        .nest_service(
            "/img",
            ServiceBuilder::new()
                .layer(CompressionLayer::new())
                .layer(SetResponseHeaderLayer::if_not_present(
                    header::CACHE_CONTROL,
                    HeaderValue::from_static("public, max-age=2592000"),
                ))
                .service(ServeDir::new("static/img")),
        )
        .layer(CompressionLayer::new())
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    println!("Listening ..");
    axum::serve(listener, app).await.unwrap();
}
