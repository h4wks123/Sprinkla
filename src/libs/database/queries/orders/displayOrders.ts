"use server";

import { getServerSession } from "next-auth";
import { db } from "../..";
import { ordersTable } from "../../schema/orders";
import { and, eq, like, count } from "drizzle-orm";
import { orderItemsTable } from "../../schema/orderItems";
import { usersTable } from "../../schema/users";

const PAGE_SIZE = 10;

export async function printOrders(query: string, currentPage: number) {
  try {
    const session = await getServerSession();
    const offset = (currentPage - 1) * PAGE_SIZE;
    const whereConditions = [];

    if (!session || !session.user.email || session.user.role === "customer") {
      return {
        status: 400,
        orders: [],
        message: "User must be authenticated or logged in.",
      };
    }

    if (query) {
      const user = await db
        .select()
        .from(usersTable)
        .where(like(usersTable.email, `%${query}%`));

      if (user.length === 0) {
        return {
          status: 404,
          orders: [],
          message: "No user found for this query.",
        };
      }

      whereConditions.push(eq(ordersTable.user_id, user[0].user_id));
    }

    const rawOrders = await db
      .select()
      .from(ordersTable)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .innerJoin(
        orderItemsTable,
        eq(ordersTable.order_id, orderItemsTable.order_id)
      )
      .innerJoin(usersTable, eq(usersTable.user_id, ordersTable.user_id))
      .limit(PAGE_SIZE)
      .offset(offset);

    const groupedOrders = new Map<number, any>();

    for (const row of rawOrders) {
      const { orders: order, order_items: item, users: user } = row;

      if (!groupedOrders.has(order.order_id)) {
        groupedOrders.set(order.order_id, {
          ...order,
          user_email: user.email,
          order_items: [item],
        });
      } else {
        groupedOrders.get(order.order_id).order_items.push(item);
      }
    }

    return {
      status: 200,
      orders: Array.from(groupedOrders.values()),
      message: "Successfully fetched orders with their items.",
    };
  } catch (error) {
    return {
      status: 500,
      orders: [],
      message: `Failed to fetch orders: ${error}`,
    };
  }
}

export async function printUserOrder(currentPage: number) {
  try {
    const session = await getServerSession();
    const offset = (currentPage - 1) * PAGE_SIZE;

    if (!session || !session.user.email || session.user.role === "employee") {
      return {
        status: 400,
        orders: [],
        message: "User must be authenticated or logged in.",
      };
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email));

    if (user.length === 0) {
      return {
        status: 404,
        orders: [],
        message: "No user found for this query.",
      };
    }

    const rawOrders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.user_id, user[0].user_id))
      .innerJoin(
        orderItemsTable,
        eq(ordersTable.order_id, orderItemsTable.order_id)
      )
      .innerJoin(usersTable, eq(usersTable.user_id, ordersTable.user_id))
      .limit(PAGE_SIZE)
      .offset(offset);

    const groupedOrders = new Map<number, any>();

    for (const row of rawOrders) {
      const { orders: order, order_items: item, users: user } = row;

      if (!groupedOrders.has(order.order_id)) {
        groupedOrders.set(order.order_id, {
          ...order,
          user_email: user.email,
          order_items: [item],
        });
      } else {
        groupedOrders.get(order.order_id).order_items.push(item);
      }
    }

    return {
      status: 200,
      orders: Array.from(groupedOrders.values()),
      message: "Successfully fetched orders with their items.",
    };
  } catch (error) {
    return {
      status: 500,
      orders: [],
      message: `Failed to fetch orders: ${error}`,
    };
  }
}

export async function fetchOrderPages(query: string) {
  try {
    const session = await getServerSession();
    const whereConditions = [];

    if (!session || !session.user.email || session.user.role === "customer") {
      return {
        status: 400,
        totalPages: 0,
        message: "User must be authenticated or logged in.",
      };
    }

    if (query) {
      whereConditions.push(like(usersTable.email, `%${query}%`));
    }

    const result = await db
      .select({ total: count(ordersTable.order_id) })
      .from(ordersTable)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const totalItems = result[0]?.total ?? 0;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    return {
      status: 200,
      totalPages,
      message: "Successfully fetched order pages.",
    };
  } catch (error) {
    return {
      status: 500,
      totalPages: 0,
      message: `Error fetching order pages: ${error}`,
    };
  }
}
