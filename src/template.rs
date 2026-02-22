use std::path::Path;

pub struct Page {
    pub root: String,
    pub info: String,
    pub lab: String,
    pub sounds: String,
    pub article: String,
}

pub struct Component {
    pub article_card: String,
}

pub struct Template {
    pub page: Page,
    pub component: Component,
}

pub fn load_template() -> Template {
    let page_path = Path::new("static/web/page");
    let component_path = Path::new("static/web/components");

    let root_content = std::fs::read_to_string(page_path.join("root.html")).unwrap();
    let info_content = std::fs::read_to_string(page_path.join("info.html")).unwrap();
    let lab_content = std::fs::read_to_string(page_path.join("lab.html")).unwrap();
    let sounds_content = std::fs::read_to_string(page_path.join("sounds.html")).unwrap();
    let article_content = std::fs::read_to_string(page_path.join("article.html")).unwrap();

    let article_card_content =
        std::fs::read_to_string(component_path.join("article_card.html")).unwrap();

    Template {
        page: Page {
            root: root_content,
            info: info_content,
            lab: lab_content,
            sounds: sounds_content,
            article: article_content,
        },
        component: Component {
            article_card: article_card_content,
        },
    }
}
