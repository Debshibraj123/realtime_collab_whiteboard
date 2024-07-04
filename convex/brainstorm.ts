// brainstorm.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSession = mutation({
  args: { boardId: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const session = await ctx.db.insert("brainstormSessions", {
      boardId: args.boardId,
      title: args.title,
      createdBy: identity.subject,
      createdAt: Date.now(),
    });

    return session;
  },
});

export const getSessions = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("brainstormSessions")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .collect();
  },
});

export const addNode = mutation({
  args: {
    sessionId: v.id("brainstormSessions"),
    type: v.string(),
    position: v.object({ x: v.number(), y: v.number() }),
    data: v.object({ label: v.string() }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const node = await ctx.db.insert("brainstormNodes", {
      sessionId: args.sessionId,
      type: args.type,
      position: args.position,
      data: args.data,
      createdBy: identity.subject,
      createdAt: Date.now(),
    });

    return node;
  },
});

export const addEdge = mutation({
  args: {
    sessionId: v.id("brainstormSessions"),
    source: v.string(),
    target: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const edge = await ctx.db.insert("brainstormEdges", {
      sessionId: args.sessionId,
      source: args.source,
      target: args.target,
      createdBy: identity.subject,
      createdAt: Date.now(),
    });

    return edge;
  },
});

export const getSessionData = query({
  args: { sessionId: v.id("brainstormSessions") },
  handler: async (ctx, args) => {
    const nodes = await ctx.db
      .query("brainstormNodes")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    const edges = await ctx.db
      .query("brainstormEdges")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    return { nodes, edges };
  },
});
