import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveTemplate = mutation({
  args: {
    tId: v.string(),
    design: v.any(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.insert("emailTemplates", {
        tId: args.tId,
        design: args.design,
        email: args.email,
      });
      return result;
    } catch (e) {}
  },
});
