use katex;
use pulldown_cmark::{CodeBlockKind, Event, Options, Parser, Tag, TagEnd};
use std::collections::HashMap;
use std::fs;
use std::path::Path;
use syntect::highlighting::ThemeSet;
use syntect::html::highlighted_html_for_string;
use syntect::parsing::SyntaxSet;

pub struct Meta {
    pub title: String,
    pub slug: String,
    pub date: String,
    pub description: String,
    pub topic: String,
}

pub struct Article {
    pub posts: HashMap<String, String>,
    pub listing: Vec<Meta>,
}

struct Frontmatter {
    title: String,
    date: String,
    description: String,
    topic: String,
}

fn parse_frontmatter(content: &str) -> Option<(Frontmatter, &str)> {
    let content = content.trim_start();
    if !content.starts_with("---") {
        return None;
    }
    let after_first = &content[3..];
    let end = after_first.find("\n---")?;
    let yaml = &after_first[..end];
    let body = &after_first[end + 4..];

    let mut title = String::new();
    let mut date = String::new();
    let mut description = String::new();
    let mut topic = String::new();

    for line in yaml.lines() {
        let line = line.trim();
        if let Some((key, val)) = line.split_once(':') {
            let key = key.trim();
            let val = val.trim();
            match key {
                "title" => title = val.to_string(),
                "date" => date = val.to_string(),
                "description" => description = val.to_string(),
                "topic" => topic = val.to_string(),
                _ => {}
            }
        }
    }

    Some((
        Frontmatter {
            title,
            date,
            description,
            topic,
        },
        body,
    ))
}

fn escape_html(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
}

fn render_markdown(markdown: &str) -> String {
    let ss = SyntaxSet::load_defaults_newlines();
    let ts = ThemeSet::load_defaults();
    let theme = &ts.themes["base16-ocean.dark"];

    let options = Options::all();
    let parser = Parser::new_ext(markdown, options);

    let mut html_output = String::new();
    let mut in_code_block = false;
    let mut code_text = String::new();
    let mut code_lang = String::new();
    let mut in_image = false;
    let mut image_src = String::new();
    let mut image_alt = String::new();

    for event in parser {
        match event {
            Event::Start(Tag::CodeBlock(kind)) => {
                in_code_block = true;
                code_text.clear();
                code_lang = match kind {
                    CodeBlockKind::Fenced(lang) => lang.to_string(),
                    CodeBlockKind::Indented => String::new(),
                };
            }
            Event::End(TagEnd::CodeBlock) => {
                in_code_block = false;
                let lang = if code_lang.is_empty() {
                    "txt"
                } else {
                    &code_lang
                };
                let syntax = ss
                    .find_syntax_by_token(lang)
                    .unwrap_or_else(|| ss.find_syntax_plain_text());
                match highlighted_html_for_string(&code_text, &ss, syntax, theme) {
                    Ok(highlighted) => html_output.push_str(&highlighted),
                    Err(_) => {
                        html_output.push_str("<pre><code>");
                        html_output.push_str(&code_text);
                        html_output.push_str("</code></pre>");
                    }
                }
                code_text.clear();
            }
            Event::Text(text) if in_code_block => {
                code_text.push_str(&text);
            }
            Event::Start(Tag::Image { dest_url, .. }) => {
                in_image = true;
                image_src = dest_url.to_string();
                image_alt.clear();
            }
            Event::Text(text) if in_image => {
                image_alt.push_str(&text);
            }
            Event::End(TagEnd::Image) => {
                in_image = false;
                html_output.push_str(&format!(
                    "<img src=\"{}\" alt=\"{}\" loading=\"lazy\">",
                    escape_html(&image_src),
                    escape_html(&image_alt),
                ));
            }
            Event::InlineMath(math) => {
                let opts = katex::Opts::builder()
                    .display_mode(false)
                    .throw_on_error(false)
                    .build()
                    .unwrap();
                match katex::render_with_opts(&math, opts) {
                    Ok(html) => html_output.push_str(&html),
                    Err(_) => html_output.push_str(&escape_html(&math)),
                }
            }
            Event::DisplayMath(math) => {
                let opts = katex::Opts::builder()
                    .display_mode(true)
                    .throw_on_error(false)
                    .build()
                    .unwrap();
                match katex::render_with_opts(&math, opts) {
                    Ok(html) => html_output.push_str(&html),
                    Err(_) => html_output.push_str(&escape_html(&math)),
                }
            }
            _ => {
                let mut tmp = String::new();
                pulldown_cmark::html::push_html(&mut tmp, std::iter::once(event));
                html_output.push_str(&tmp);
            }
        }
    }

    html_output
}

fn walk_articles(dir: &Path, base: &Path, state: &mut Article) {
    let entries = match fs::read_dir(dir) {
        Ok(e) => e,
        Err(e) => {
            eprintln!("Error reading {}: {}", dir.display(), e);
            return;
        }
    };

    for entry in entries.flatten() {
        let path = entry.path();
        if path.is_dir() {
            walk_articles(&path, base, state);
        } else if path.extension().and_then(|s| s.to_str()) == Some("md") {
            let content = match fs::read_to_string(&path) {
                Ok(c) => c,
                Err(e) => {
                    eprintln!("Error reading {}: {}", path.display(), e);
                    continue;
                }
            };

            let (fm, body) = match parse_frontmatter(&content) {
                Some(v) => v,
                None => {
                    eprintln!("No frontmatter in {}", path.display());
                    continue;
                }
            };

            let relative = path.strip_prefix(base).unwrap();
            let slug = relative
                .with_extension("")
                .to_string_lossy()
                .replace('\\', "/");

            let html = render_markdown(body);

            println!("  loaded Article: /article/{}", slug);

            state.listing.push(Meta {
                title: fm.title,
                slug: slug.clone(),
                date: fm.date,
                description: fm.description,
                topic: fm.topic,
            });

            state.posts.insert(slug, html);
        }
    }
}

pub fn load_articles() -> Article {
    let base = Path::new("static/articles");

    let mut state = Article {
        posts: HashMap::new(),
        listing: Vec::new(),
    };

    if base.exists() {
        walk_articles(base, base, &mut state);
        state.listing.sort_by(|a, b| b.date.cmp(&a.date));
    } else {
        eprintln!("article directory not found: {}", base.display());
    }

    println!("Loaded {} article posts", state.listing.len());
    state
}
