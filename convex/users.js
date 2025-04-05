import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";


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
      // Initialize credits for new users
      await ctx.db.insert("users", { ...userAttributes, credits: 1 });
    } else {
      // Only patch attributes, don't overwrite credits unless intended
      await ctx.db.patch(user._id, userAttributes);
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
