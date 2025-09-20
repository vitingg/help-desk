import changePassword from "./routes/users/change-password-routes";
import category from "./routes/tickets/category-routes";
import clientRoutes from "./routes/users/client-routes";
import { setupSwagger } from "./utils/swagger-config";
import service from "./routes/tickets/ticket-routes";
import techRoutes from "./routes/users/tech-routes";
import signIn from "./routes/users/auth-routes";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

const frontendUrl = process.env.FRONTEND_URL;
console.log("Frontend URL:", frontendUrl);

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", clientRoutes);
app.use("/", techRoutes);
app.use("/", signIn);
app.use("/", category);
app.use("/", service);
app.use("/", changePassword);

setupSwagger(app);

console.log("Bem vindo Desenvolvedor!");
console.log("Acesse /api-docs para ver todas as rotas!");
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Backend rodando na porta ${port}`);
});

export default app;
