import { api } from "../../../shared/lib/api";

export function signUp(data: {
  username: string;
  email: string;
  password: string;
}) {
  return api.post("/clients", data);
}
