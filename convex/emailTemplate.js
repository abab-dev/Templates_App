import { mutation, query } from "./_generated/server";
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

export const GetTemplateDesign =query({
  args:{
    email:v.string(),
    tId:v.string()
  },
  handler:async(ctx,args)=>{
  try{
    const result = await ctx.db.query('emailTemplates')
    .filter((q)=> q.and(q.eq(q.field(tId),args.tId)),
    q.eq(q.field('email'),args.email))
    .collect()

    return result[0]
  }
}catch(e){
 return {} 
}
})
