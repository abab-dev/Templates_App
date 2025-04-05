import { internalMutation, mutation, query, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Webhook } from "svix"; // Keep if needed elsewhere, but not directly for Clerk SDK
import { Clerk } from "@clerk/clerk-sdk-node"; // Import Clerk SDK

// Initialize Clerk client. Ensure CLERK_SECRET_KEY is set in Convex environment variables.
const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });


export const upsertFromClerk = internalMutation({
  args: { data: v.any() }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    // Extract email and ensure it's a string, handle cases where it might be missing or not primary
    const primaryEmail = data.email_addresses?.find(
      (e) => e.id === data.primary_email_address_id,
    );
    const email = primaryEmail?.email_address ?? ""; // Default to empty string if no email found

    const userAttributes = {
      name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(), // Handle potential null names
      clerkId: data.id,
      email: email,
      picture: data.image_url,
    };

    const user = await userByClerkId(ctx, data.id);
    if (user === null) {
      // User is new, insert them with initial credits
      console.log(`Creating new user: ${userAttributes.email}`);
      await ctx.db.insert("users", { ...userAttributes, credits: 1 });
    } else {
      // User already exists, update their attributes (idempotent)
      // This handles the user.updated event or ensures data consistency if user.created is received again.
      console.log(`Updating existing user: ${userAttributes.email}`);
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

// Action to ensure user exists, fetching from Clerk if necessary
export const ensureUserExists = internalAction({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    // Check if user already exists
    const user = await ctx.runQuery(internal.users.getUserByClerkId, { clerkId: clerkUserId });

    if (user !== null) {
      // User exists, no action needed
      console.log(`User ${clerkUserId} already exists.`);
      return;
    }

    // User doesn't exist, fetch from Clerk
    console.log(`User ${clerkUserId} not found in DB. Fetching from Clerk...`);
    try {
      const clerkUser = await clerk.users.getUser(clerkUserId);
      if (!clerkUser) {
        console.error(`Could not find user ${clerkUserId} in Clerk.`);
        // Decide if you want to throw an error or just log
        return;
      }

      // Call the mutation to create/update the user in Convex DB
      // Pass the fetched Clerk user data structure
      await ctx.runMutation(internal.users.upsertFromClerk, { data: clerkUser });
      console.log(`Successfully created user ${clerkUserId} from Clerk data.`);

    } catch (error) {
      console.error(`Error fetching user ${clerkUserId} from Clerk or upserting:`, error);
      // Handle error appropriately, maybe throw to signal failure
    }
  },
});


export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkId(ctx, clerkUserId);

    if (user !== null) {
      // Consider what should happen to related data when a user is deleted
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  // Clerk's user ID is in the 'subject' field of the identity
  return await userByClerkId(ctx, identity.subject);
}

// Renamed function and updated index/field names
async function userByClerkId(ctx, clerkId) {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
    .unique();
}

export const hasCredits = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await userByClerkId(ctx, args.clerkId);
    return user ? user.credits > 0 : false;
  },
});

export const decrementCredits = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await userByClerkId(ctx, args.clerkId);
    if (user && user.credits > 0) {
      await ctx.db.patch(user._id, { credits: user.credits - 1 });
      return true; // Indicate successful decrement
    }
    return false; // Indicate failure (no credits or user not found)
  },
});
