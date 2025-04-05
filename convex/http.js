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
      // Handle the specific error for missing secret
      if (err instanceof Error && err.message.includes("Webhook secret not configured")) {
        return new Response("Internal Server Error: Webhook secret not configured", { status: 500 });
      }
      // Handle other potential errors during validation setup if necessary
      console.error("Unexpected error during webhook validation setup:", err);
      return new Response("Internal Server Error", { status: 500 });
    }

    if (!event) {
      // This now specifically means signature verification failed
      return new Response("Webhook validation failed", { status: 400 });
    }

    // Ensure event has a 'type' property before switching
    if (typeof event !== 'object' || event === null || !('type' in event)) {
        console.error("Received invalid event structure from webhook verification");
        return new Response("Invalid event structure", { status: 400 });
    }

    switch (event.type) {
      case "user.created": // intentional fallthrough
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
     case "session.created":
       // Potentially log session creation or relate session data if needed in the future
       console.log("Received session.created event, User ID:", event.data.user_id, "Session ID:", event.data.id);
       break;
     case "session.ended":
       // Handle session ending, e.g., logging out user status if tracked
       console.log("Received session.ended event, User ID:", event.data.user_id, "Session ID:", event.data.id);
       break;
     case "session.revoked":
       // Handle revoked sessions, potentially forcing logout or cleanup
       console.log("Received session.revoked event, User ID:", event.data.user_id, "Session ID:", event.data.id);
       break;
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
    // Throw an error to be caught by the main handler for a 500 response
    throw new Error("Webhook secret not configured on the server.");
  }
  const wh = new Webhook(secret);
  try {
    // Ensure the object returned by verify is correctly typed or handled
    const event = wh.verify(payloadString, svixHeaders);
    // Assuming verify returns the event object on success
    // and throws on failure based on svix library behavior.
    return event; // Return the verified event object directly
  } catch (error) {
    // Log the specific verification error
    console.error("Error verifying webhook signature:", error);
    // Indicate validation failure, leading to a 400 response
    return null;
  }
}

export default http;
