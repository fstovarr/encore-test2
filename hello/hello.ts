import { api } from "encore.dev/api";
import { db } from "../db";
import { users } from "../db/schema";

interface HelloResponse {
  message: string;
}

interface HealthResponse {
  status: string;
  timestamp: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const root = api(
  { expose: true, method: "GET", path: "/" },
  async (): Promise<HelloResponse> => {
    return { message: "Hello World!" };
  },
);

export const health = api(
  { expose: true, method: "GET", path: "/health" },
  async (): Promise<HealthResponse> => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  },
);

export const createUser = api(
  { expose: true, method: "POST", path: "/users" },
  async (req: CreateUserRequest): Promise<User> => {
    const [user] = await db.insert(users).values(req).returning();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  },
);

export const listUsers = api(
  { expose: true, method: "GET", path: "/users" },
  async (): Promise<{ users: User[] }> => {
    const rows = await db.select().from(users);
    return {
      users: rows.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        createdAt: u.createdAt.toISOString(),
      })),
    };
  },
);
