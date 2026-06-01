import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const body = await req.json();

  const slug = body?.slug;

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  revalidateTag(`page-${slug}`, "default");

  return new Response("Revalidated", { status: 200 });
}