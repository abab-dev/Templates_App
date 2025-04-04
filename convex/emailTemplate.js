import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveTemplate = mutation({
  args: {
    tId: v.string(),
    design: v.any(),
    email: v.string(),
    description:v.any()
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.insert("emailTemplates", {
        tId: args.tId,
        design: args.design,
        description:args.description,
        email: args.email,
      });
      return result;
    } catch (e) {}
  },
});

export const GetTemplateDesign = query({
  args: {
    email: v.string(),
    tId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query("emailTemplates")
        .filter((q) =>
          q.and(
            q.eq(q.field("tId"), args.tId),
            q.eq(q.field("email"), args.email)
          )
        )
        .collect();

      return result[0];
    } catch (e) {
      return {};
    }
  },
});

export const GetAllTemplatesForEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query("emailTemplates")
        .filter((q) => q.eq(q.field("email"), args.email))
        .collect();

      return result;
    } catch (e) {
      return [];
    }
  },
});

export const UpdateTemplateDesign = mutation({
  args: {
    tId: v.string(),
    design: v.any(), // Expecting the design object directly
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("tId"), args.tId))
      .collect();

    if (result && result.length > 0) {
      const docId = result[0]._id;
      // Patch with the design object directly
      await ctx.db.patch(docId, {
        design: args.design,
      });
    } else {
      console.warn(`No email template found with tId: ${args.tId}`);
    }
  },
});
