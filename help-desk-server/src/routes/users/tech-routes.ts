import {
  createTech,
  getTechs,
  putTech,
  deleteTech,
  getOneTech,
} from "@controllers/users/tech-controller";
import { authorize } from "@src/middlewares/authorize";
import { app } from "@src/lib/app-express";
import { upload } from "@src/middlewares/multer-memory";

/**
 * @openapi
 * /techs:
 *   post:
 *     tags:
 *       - Tech
 *     summary: Cria um novo técnico
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
 *         description: Técnico criado com sucesso
 *       400:
 *         description: Erro ao criar um técnico
 *       401:
 *         description: Não autorizado
 */
app.post("/techs", authorize(["ADMIN"]), createTech);

/**
 * @openapi
 * /techs:
 *   get:
 *     tags:
 *       - Tech
 *     summary: Lista todos os técnicos
 *     responses:
 *       200:
 *         description: Técnicos retornados com sucesso
 *       401:
 *         description: Não autorizado
 */
app.get("/techs", getTechs);

/**
 * @openapi
 * /techs/{id}:
 *   get:
 *     tags:
 *       - Tech
 *     summary: Buscar um técnico pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Técnico encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tech'
 *       404:
 *         description: Técnico não encontrado
 *       401:
 *         description: Não autorizado
 */
app.get("/techs/:id", getOneTech);

/**
 * @openapi
 * /techs/{id}:
 *   put:
 *     tags:
 *       - Tech
 *     summary: Atualizar um técnico
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
 *         description: Técnico atualizado com sucesso
 *       404:
 *         description: Técnico não encontrado
 *       401:
 *         description: Não autorizado
 */
app.put(
  "/techs/:id",
  upload.single("profilePicture"),
  authorize(["ADMIN", "TECH"]),
  putTech
);

/**
 * @openapi
 * /techs/{id}:
 *   delete:
 *     tags:
 *       - Tech
 *     summary: Removendo um técnico pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Técnico deletado com sucesso
 *       404:
 *         description: Técnico não encontrado
 *       401:
 *         description: Não autorizado
 */
app.delete("/techs/:id", authorize(["ADMIN"]), deleteTech);

export default app;
