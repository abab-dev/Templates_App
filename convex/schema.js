import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    credits: v.number(),
    clerkId: v.string(), // Add Clerk User ID field
  }).index("by_clerk_id", ["clerkId"]) // Add index for efficient lookup by Clerk ID

})

