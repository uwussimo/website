import { db } from "@/prisma/db";

// an image never changes once stored (an edit uploads a new one under a new
// id), so browsers and the cdn may keep it forever
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) return new Response(null, { status: 404 });

  const media = await db.orm.public.Media.select("data", "mimeType").first({
    id,
  });
  if (!media) return new Response(null, { status: 404 });

  return new Response(Buffer.from(media.data), {
    headers: {
      "Content-Type": media.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
