import { validateUser } from "@src/middlewares/validate-user";
import { signUpSchema } from "@src/schemas-zod/schemas";
import { app } from "@src/lib/app-express";
import {
  createClient,
  getClients,
  putClient,
  deleteClients,
  getOneClient,
} from "@controllers/users/client-controller";
import { upload } from "@src/middlewares/multer-memory";

/**
 * @openapi
 * /clients:
 *   post:
 *     tags:
 *       - Client
 *     summary: Cria um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar um usuário
 *       401:
 *         description: Não autorizado
 */
app.post("/clients", validateUser(signUpSchema), createClient);

/**
 * @openapi
 * /clients:
 *   get:
 *     summary: Lista todos os clientes
 *     tags:
 *       - Client
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
app.get("/clients", getClients);

/**
 * @openapi
 * /clients/{id}:
 *   get:
 *     tags:
 *       - Client
 *     summary: Buscar um cliente pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 *       401:
 *         description: Não autorizado
 */
app.get("/clients/:id", getOneClient);

/**
 * @openapi
 * /clients/{id}:
 *   put:
 *     tags:
 *       - Client
 *     summary: Atualizar um cliente por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                profilePicture:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       401:
 *         description: Não autorizado
 */
app.put("/clients/:id", upload.single("profilePicture"), putClient);

/**
 * @openapi
 * /clients/{id}:
 *   delete:
 *     tags:
 *       - Client
 *     summary: Removendo um cliente pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       401:
 *         description: Não autorizado
 */
app.delete("/clients/:id", deleteClients);

export default app;
