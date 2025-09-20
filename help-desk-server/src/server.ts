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

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

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

console.log("=============================================");
console.log("INICIANDO DEBUG DA VARIÁVEL DE AMBIENTE");
console.log("DATABASE_URL Recebida:", process.env.DATABASE_URL);
console.log("=============================================");

export default app;
