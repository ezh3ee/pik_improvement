import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/api/yandex/tile") {
    return handleYandexTileRequest(req);
  }
}

async function handleYandexTileRequest(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const x = searchParams.get("x");
  const y = searchParams.get("y");
  const z = searchParams.get("z");

  if (!x || !y || !z) {
    return new Response("Missing tile params", { status: 400 });
  }

  const url = `https://tiles.api-maps.yandex.ru/v1/tiles/?x=${x}&y=${y}&z=${z}&lang=ru_RU&scale=2&l=map&apikey=${process.env.NEXT_PUBLIC_YANDEX_TILES_KEY}`;

  const upstream = await fetch(url, {
    cache: "no-store",
  });

  if (!upstream.ok) {
    if (upstream.status === 429) {
      return new Response(null, {
        status: 204,
        // headers: upstream.headers
        headers: {
          "X-Rate-Limited": "true",
        },
      });
    }

    return new Response(null, {
      status: upstream.status,
    });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: upstream.headers,
  });
}

export const config = {
  matcher: "/api/yandex/tile",
};
