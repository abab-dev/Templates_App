// app/api/clerk-user-fetch/route.js
export async function POST(req) {
  const { userId } = await req.json();

  const apiKey = process.env.CLERK_SECRET_KEY;
  if (!apiKey || !userId) {
    return new Response("Missing API key or userId", { status: 400 });
  }

  const res = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!res.ok) {
    return new Response("Failed to fetch Clerk user", { status: res.status });
  }

  const userData = await res.json();
  return Response.json(userData);
}

