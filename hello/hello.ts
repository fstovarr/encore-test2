import { api } from "encore.dev/api";

interface HelloResponse {
  message: string;
}

interface HealthResponse {
  status: string;
  timestamp: string;
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
