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
  const fullPath = path.join(postsDirectory, slugPath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const parsedSlug = slugPath.replace(/\\/g, '/').replace(/\.md$/, '');
  const category = slugPath.split(path.sep)[0];

  return {
    slug: parsedSlug,
    frontmatter: { category, ...data },
    content
  };
}

export function getAllPosts() {
  return getPostSlugs().map((slug) => getPostBySlug(slug));
}