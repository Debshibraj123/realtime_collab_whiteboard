import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const sendMessage = mutation({
  args: {
    orgId: v.string(),
    boardId: v.id("boards"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;
    const author = identity.name!;

    const message = await ctx.db.insert("messages", {
      orgId: args.orgId,
      boardId: args.boardId,
      userId,
      content: args.content,
      author,
      createdAt: Date.now(),
    });

    return message;
  },
});

export const getMessages = query({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .order("desc")
      .take(50);

    return messages.reverse();
  },
});