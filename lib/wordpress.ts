import * as cheerio from "cheerio";
import { XMLParser } from "fast-xml-parser";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
});

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  link: string;
  tag: string;
  image?: string;
  date?: string;
};

type RSSItem = {
  guid?: string;
  title?: string;
  link?: string;
  pubDate?: string;
  category?: string;
  description?: string;
  enclosure?: {
    "@_url"?: string;
  };
  "content:encoded"?: string;
};

async function fetchOgImage(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const html = await res.text();

    const match = html.match(
      /<meta property="og:image" content="([^"]+)"/
    );

    return match?.[1] || null;
  } catch {
    return null;
  }
}

async function getFeedPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    "https://www.elc.co.uk/raising-little-explorers/feed",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`RSS blocked: ${res.status}`);
  }

  const xml = await res.text();
  const data = new XMLParser({ ignoreAttributes: false }).parse(xml);

  const items = data?.rss?.channel?.item || [];

  const posts = await Promise.all(
    items.map(async (item: RSSItem) => {
      const link = item.link;

      const slug =
        link?.split("/").filter(Boolean).pop() ?? "";

      // 🖼 Try RSS first
      let image =
        item.enclosure?.["@_url"] ||
        item.description?.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
        null;

      // 🧠 fallback: OG image from post page (THIS fixes your issue)
      if (!image && link) {
        image = await fetchOgImage(link);
      }

      return {
        id: item.guid ?? slug,
        title: item.title ?? "",
        slug,
        link,
        tag: item.category ?? "Blog",
        date: item.pubDate,
        image,
      };
    })
  );

  return posts;
}

export async function getLatestPosts(limit = 4): Promise<BlogPost[]> {
  const posts = await getFeedPosts();
  return posts.slice(0, limit);
}

export async function getPosts(page = 1, perPage = 12) {
  const allPosts = await getFeedPosts();

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    posts: allPosts.slice(start, end),
    totalPosts: allPosts.length,
    totalPages: Math.ceil(allPosts.length / perPage),
  };
}

export async function getPost(slug: string) {
  const posts = await getFeedPosts();

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }

  const res = await fetch(post.link, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Post blocked: ${res.status}`);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  const contentHtml =
    $("#wrapper").html() ||
    $(".post-content").html() ||
    $("article").html() ||
    $("main").html() ||
    "";

  const image =
    $('meta[property="og:image"]').attr("content") ||
    post.image ||
    "";

  return {
    ...post,
    image,
    contentHtml,
  };
}