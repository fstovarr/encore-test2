import { api } from "encore.dev/api";

interface HealthResponse {
  status: string;
  timestamp: string;
}

export const health = api(
  { expose: true, method: "GET", path: "/health" },
  async (): Promise<HealthResponse> => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  },
);
