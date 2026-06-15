import * as cheerio from "cheerio";
import { XMLParser } from "fast-xml-parser";

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

const xmlParser = new XMLParser({
  ignoreAttributes: false,
});

async function fetchOgImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) return undefined;

    const html = await res.text();

    const match = html.match(
      /<meta property="og:image" content="([^"]+)"/
    );

    return match?.[1];
  } catch {
    return undefined;
  }
}

/**
 * TRUE pagination check:
 * Instead of guessing, we check if next page actually returns items.
 */
async function hasNextPage(page: number): Promise<boolean> {
  try {
    const res = await fetch(
      `https://www.elc.co.uk/raising-little-explorers/feed?paged=${page + 1}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return false;

    const xml = await res.text();

    const data = xmlParser.parse(xml);
    const items = data?.rss?.channel?.item;

    return Array.isArray(items) && items.length > 0;
  } catch {
    return false;
  }
}

async function getFeedPosts(page = 1): Promise<BlogPost[]> {
  const res = await fetch(
    `https://www.elc.co.uk/raising-little-explorers/feed?paged=${page}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error(`RSS blocked: ${res.status}`);
    return [];
  }

  const xml = await res.text();
const data = xmlParser.parse(xml);

console.log("RSS DATA", JSON.stringify(data).slice(0, 1000));
console.log("ITEMS TYPE", typeof data?.rss?.channel?.item);
console.log("ITEMS", data?.rss?.channel?.item?.length);

  const items: RSSItem[] =
    data?.rss?.channel?.item || [];

  const posts = await Promise.all(
    items.map(async (item) => {
      const link = item.link;

      const slug =
        link?.split("/").filter(Boolean).pop() ?? "";

      // 🖼 RSS image first
      let image =
        item.enclosure?.["@_url"] ||
        item.description?.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
        undefined;

      if (!image && link) {
        try {
          image = await fetchOgImage(link);
        } catch (e) {
          console.error("OG image failed", link, e);
        }
      }

      return {
        id: item.guid ?? slug,
        title: item.title ?? "",
        slug,
        link: link ?? "",
        tag: item.category ?? "Blog",
        date: item.pubDate,
        image,
      };
    })
  );

  return posts;
}

export async function getPosts(page = 1, perPage = 12) {
  const posts = await getFeedPosts(page);

  const hasNext = await hasNextPage(page);

  return {
    posts,
    page,
    perPage,
    hasNextPage: hasNext,
  };
}

export async function getLatestPosts(limit = 4) {
  try {
    const posts = await getFeedPosts(1);
    return posts.slice(0, limit);
  } catch (error) {
    console.error("getLatestPosts failed", error);
    return [];
  }
}

export async function getPost(slug: string, page = 1) {
  const posts = await getFeedPosts(page);

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
    $(".row-news-single .col.col-xs-12.col-sm-10.col-md-8.col-md-offset-2.col-lg-6.col-lg-offset-3").html() ||
    "";

  const image =
    $('meta[property="og:image"]').attr("content") ||
    post.image ||
    undefined;

  return {
    ...post,
    image,
    contentHtml,
  };
}