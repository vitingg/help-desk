import { validateUser } from "@src/middlewares/validate-user";
import { signInSchema } from "@src/schemas-zod/schemas";
import { app } from "@src/lib/app-express";
import {
  signInController,
  signOutController,
  getCurrentUser,
} from "@controllers/users/auth-controller";
import { authorize } from "@src/middlewares/authorize";

/**
 * @openapi
 * /sign-in:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Realiza o login e retorna um token de acesso
 *     description: Endpoint público para autenticar um usuário com e-mail e senha.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'usuario@email.com'
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 'senha123'
 *     responses:
 *       '200':
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado (credenciais incorretas).
 */
app.post("/sign-in", validateUser(signInSchema), signInController);

/**
 * @openapi
 * /sign-out:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Faz logout do usuário
 *     description: Invalida o token do usuário atual (opcional, caso você use refresh tokens).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Não autorizado
 */
app.post("/sign-out", signOutController);

/**
 * @openapi
 * /me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Retorna o usuário autenticado
 *     description: Recupera os dados do usuário atualmente logado com base no token JWT.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "Victor Gabriel"
 *                 email:
 *                   type: string
 *                   example: "victor@example.com"
 *                 role:
 *                   type: string
 *                   example: "CLIENT"
 *       401:
 *         description: Não autorizado
 */
app.get("/me", authorize(), getCurrentUser);

export default app;
