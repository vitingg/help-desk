import { api } from "../../../shared/lib/api";

export function signIn(data: { email: string; password: string }) {
  return api.post("/sign-in", data);
}
