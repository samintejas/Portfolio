import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

function walkDir(dir: string, filelist: string[] = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkDir(filepath, filelist);
    } else if (file.endsWith('.md')) {
      filelist.push(path.relative(postsDirectory, filepath));
    }
  });
  return filelist;
}

export function getPostSlugs() {
  return walkDir(postsDirectory);
}

export function getPostBySlug(slugPath: string) {
  const decodedSlugPath = decodeURIComponent(slugPath); // Decode the slug to handle spaces
  const fullPath = path.join(postsDirectory, decodedSlugPath);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const parsedSlug = decodedSlugPath.replace(/\\/g, '/').replace(/\.md$/, '');
  const category = decodedSlugPath.split(path.sep)[0];

  return {
    slug: parsedSlug,
    frontmatter: { category, ...data },
    content,
  };
}

export function getAllPosts() {
  return getPostSlugs().map((slug) => getPostBySlug(slug));
}