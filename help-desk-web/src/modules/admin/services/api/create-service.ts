import { api } from "../../../../shared/lib/api";

export function createService(data: { name: string; basePrice: number }) {
  return api.post("/categories", data);
}
