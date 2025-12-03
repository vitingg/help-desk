import { app } from "@src/lib/app-express";
import {
  createCategory,
  clientGetCategories,
  deleteCategory,
  getCategories,
  getOneCategory,
  toggleCategoryStatus,
  updateCategory,
} from "@src/controllers/category/category-controller";

/**
 * @openapi
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Cria uma nova categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - basePrice
 *             properties:
 *               name:
 *                 type: string
 *               basePrice:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Erro ao criar uma categoria
 *       401:
 *         description: Não autorizado
 */
app.post("/categories", createCategory);

/**
 * @openapi
 * /all-categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/categories'
 */
app.get("/categories", getCategories);

/**
 * @openapi
 * /categories/available-categories:
 *   get:
 *     summary: Lista todas as categorias disponíveis (true)
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/categories'
 */
app.get("/categories/available-categories", clientGetCategories);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Buscar uma categoria pelo ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada
 *       401:
 *         description: Não autorizado
 */
app.get("/categories/:id", getOneCategory);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Atualizar um status da categoria
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       401:
 *         description: Não autorizado
 */
app.put("/categories/toggle/:id", toggleCategoryStatus);

/**
 * @openapi
 * /categories/change-parameters/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Atualizar uma categoria por ID
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
 *               name:
 *                 type: string
 *               basePrice:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       401:
 *         description: Não autorizado
 */
app.put("/categories/:id", updateCategory);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Removendo uma categoria pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria deletado com sucesso
 *       404:
 *         description: Categoria não encontrado
 *       401:
 *         description: Não autorizado
 */
app.delete("/categories/:id", deleteCategory);

export default app;
