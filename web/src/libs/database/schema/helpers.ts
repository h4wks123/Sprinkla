import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

export const timestamps = {
  time: text("time").default(sql`(CURRENT_TIME)`),
  date: text("date").default(sql`(CURRENT_DATE)`),
  timestamp: text("time_stamp").default(sql`(CURRENT_TIMESTAMP)`),
};
