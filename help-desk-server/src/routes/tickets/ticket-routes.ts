import { app } from "@src/lib/app-express";
import {
  createTicket,
  getTickets,
  deleteTickets,
  patchTicketStatus,
  getTicketsById,
  patchTicketAdditionalCategory,
  patchTicketAddTech,
} from "@controllers/tickets/ticket-controller";
import { authorize } from "@src/middlewares/authorize";

/**
 * @openapi
 * /service:
 *   post:
 *     tags:
 *       - Service
 *     summary: Cria um novo serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Service"
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *       400:
 *         description: Erro ao criar um serviço
 *       401:
 *         description: Não autorizado
 */
app.post("/services", createTicket);

/**
 * @openapi
 * /service:
 *   get:
 *     tags:
 *       - Service
 *     summary: Lista todos os serviços
 *     responses:
 *       200:
 *         description: Serviços retornados com sucesso
 *       401:
 *         description: Não autorizado
 */
app.get("/services", getTickets);

/**
 * @openapi
 * /services/{id}:
 *   get:
 *     tags:
 *       - Service
 *     summary: Buscar um serviço pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Serviço não encontrado
 *       401:
 *         description: Não autorizado
 */
app.get("/services/:id", getTicketsById);

/**
 * @openapi
 * /services/{id}/change-status:
 *   patch:
 *     tags:
 *       - Service
 *     summary: Alterar o status de um serviço
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
 *               status:
 *                 type: string
 *                 description: Novo status do serviço
 *                 example: "IN_PROGRESS"
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       404:
 *         description: Serviço não encontrado
 *       401:
 *         description: Não autorizado
 */
app.patch("/services/:id/change-status", patchTicketStatus);

/**
 * @openapi
 * /services/{id}/additional-categories:
 *   patch:
 *     tags:
 *       - Service
 *     summary: Adicionar categorias adicionais a um serviço
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
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de IDs de categorias adicionais
 *                 example: [2, 3, 5]
 *     responses:
 *       200:
 *         description: Categorias adicionais atribuídas com sucesso
 *       404:
 *         description: Serviço não encontrado
 *       401:
 *         description: Não autorizado
 */
app.patch("/services/:id/additional-categories", patchTicketAdditionalCategory);

/**
 * @openapi
 * /services/{id}/assign:
 *   patch:
 *     tags:
 *       - Service
 *     summary: Atribuir um técnico a um serviço
 *     security:
 *       - bearerAuth: []
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
 *               techId:
 *                 type: integer
 *                 description: ID do técnico a ser atribuído
 *                 example: 5
 *     responses:
 *       200:
 *         description: Técnico atribuído com sucesso
 *       404:
 *         description: Serviço ou técnico não encontrado
 *       401:
 *         description: Não autorizado
 */
app.patch("/services/:id/assign", authorize([`TECH`]), patchTicketAddTech);

/**
 * @openapi
 * /service/{id}:
 *   delete:
 *     summary: Deleta um serviço existente
 *     description: Remove um serviço do sistema com base no ID fornecido.
 *     tags:
 *       - Service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do service a ser deletado
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso (sem conteúdo).
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
app.delete("/services/:id", deleteTickets);

export default app;
