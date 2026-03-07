import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/essays");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  description?: string;
};

export type Post = PostMeta & {
  content: string;
};

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(getSlugFromFilename);
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    readTime: (data.readTime as string) ?? "5 min",
    description: data.description as string | undefined,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { ...meta } = post;
      return meta;
    })
    .filter(Boolean) as PostMeta[];

  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}
