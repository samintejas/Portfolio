use std::fs;

struct BlogPost {
    title: String,
    slug: String,
    date: String,
    description: String,
    featured: bool,
}

const SOURCE_DIR: &str = "/static/blog/";

fn blog_metadata() -> Result<Vec<BlogPost>, std::io::Error> {
    todo!()
    // read blog directory

    // create a tree datastructure
    // if .md file exists , read it and extract metadata
    // store the blog metadata and its parsed content into an key value datastructure
    // if marked as featured then store it into a separate list
}

fn process_single_dir(path: &str) -> Result<BlogPost, std::io::Error> {
    for dir_entry in fs::read_dir(SOURCE_DIR)? {
        let entry = match dir_entry {
            Ok(o) => o,
            Err(e) => {
                eprintln!("Error reading directory entry: {}", e);
                continue;
            }
        };

        let path = entry.path();

        let file_type = match entry.file_type() {
            Ok(ft) => ft,
            Err(e) => {
                eprintln!("Error getting file type: {}", e);
                continue;
            }
        };

        if file_type.is_dir() {
            process_single_dir(entry.path().to_str().unwrap())?;
        } else {
            let extension = path.extension().and_then(|s| s.to_str()).unwrap_or("");

            if extension == "md" {
                let content = fs::read_to_string(entry.path())?;
                // parse the content and extract metadata
                // store the metadata and content into a key value datastructure
            }
        }
    }

    todo!()
}
