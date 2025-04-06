// http.js
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    let event;
    try {
      event = await validateRequest(request);
    } catch (err) {
      if (err instanceof Error && err.message.includes("Webhook secret not configured")) {
        return new Response("Internal Server Error: Webhook secret not configured", { status: 500 });
      }
      console.error("Unexpected error during webhook validation setup:", err);
      return new Response("Internal Server Error", { status: 500 });
    }

    if (!event) {
      return new Response("Webhook validation failed", { status: 400 });
    }

    if (typeof event !== 'object' || event === null || !('type' in event)) {
      console.error("Received invalid event structure from webhook verification");
      return new Response("Invalid event structure", { status: 400 });
    }

    switch (event.type) {
      case "user.created":
      case "user.updated":
        await ctx.runMutation(internal.users.upsertFromClerk, {
          data: event.data,
        });
        break;

      case "user.deleted": {
        const clerkUserId = event.data.id;
        if (!clerkUserId) {
          console.error("User deleted event missing user ID:", event.data);
          return new Response("Invalid event data for user.deleted", { status: 400 });
        }
        await ctx.runMutation(internal.users.deleteFromClerk, { clerkUserId });
        break;
      }

      case "session.created": {
        const userId = event.data.user_id;
        if (!userId) {
          console.error("Missing user_id in session.created event");
          return new Response("Missing user_id", { status: 400 });
        }

        const baseUrl = process.env.PUBLIC_VERCEL_BASE_URL || "http://localhost:3000";
        const userRes = await fetch(`${baseUrl}/api/clerk-user-fetch`, {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: { "Content-Type": "application/json" },
        });


        if (!userRes.ok) {
          console.error("Failed to fetch user from Clerk API", await userRes.text());
          return new Response("Failed to fetch user data", { status: 502 });
        }

        const userData = await userRes.json();

        await ctx.runMutation(internal.users.upsertFromClerk, {
          data: userData,
        });

        break;
      }

      default:
        console.log("Ignored Clerk webhook event:", event.type);
    }

    return new Response(null, { status: 200 });
  }),
});

async function validateRequest(req) {
  const payloadString = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id"),
    "svix-timestamp": req.headers.get("svix-timestamp"),
    "svix-signature": req.headers.get("svix-signature"),
  };
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    console.error("CLERK_WEBHOOK_SECRET environment variable not set.");
    throw new Error("Webhook secret not configured on the server.");
  }
  const wh = new Webhook(secret);
  try {
    const event = wh.verify(payloadString, svixHeaders);
    return event;
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return null;
  }
}

export default http;

