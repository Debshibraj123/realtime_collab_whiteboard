import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
  .index("by_org", ["orgId"])
  .searchIndex("search_title", {
    searchField: "title",
    filterFields: ["orgId"]
  }),

  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id("boards")
  })
  .index("by_board", ['boardId'])
  .index("by_user_org", ["userId", "orgId"])
  .index("by_user_board", ["userId", "boardId"])
  .index("by_user_board_org", ["userId", "boardId", "orgId"]),

  messages: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id("boards"),
    content: v.string(),
    author: v.string(),
    createdAt: v.number()
  })
  .index("by_board", ['boardId'])
  .index("by_org", ['orgId'])
  .index("by_user", ['userId'])
  .index("by_createdAt", ["createdAt"]),

  brainstormSessions: defineTable({
    boardId: v.id("boards"),
    title: v.string(),
    createdBy: v.string(),
    createdAt: v.number(),
  })
  .index("by_board", ["boardId"]),

  brainstormNodes: defineTable({
    sessionId: v.id("brainstormSessions"),
    type: v.string(),
    position: v.object({
      x: v.number(),
      y: v.number(),
    }),
    data: v.object({
      label: v.string(),
    }),
    createdBy: v.string(),
    createdAt: v.number(),
  })
  .index("by_session", ["sessionId"]),

  brainstormEdges: defineTable({
    sessionId: v.id("brainstormSessions"),
    source: v.string(),
    target: v.string(),
    createdBy: v.string(),
    createdAt: v.number(),
  })
  .index("by_session", ["sessionId"]),
});
