import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Help-desk",
      version: "1.0.0",
      description:
        "Documentação da API do help-desk, site focado a atendimento e resolução de problemas.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Client: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "O ID único do cliente.",
              example: 10,
            },
            username: {
              type: "string",
              description: "Nome de usuário do cliente.",
              example: "Victor Gabriel",
            },
            email: {
              type: "string",
              description: "E-mail do cliente.",
              example: "victor@example.com",
            },
          },
        },
        Tech: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "O ID único do técnico.",
              example: 10,
            },
            username: {
              type: "string",
              description: "Nome de usuário do técnico.",
              example: "José Ronaldo",
            },
            email: {
              type: "string",
              description: "E-mail do cliente.",
              example: "jose@example.com",
            },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "O ID único da categoria.",
              example: 10,
            },
            name: {
              type: "string",
              description: "Nome da categoria.",
              example: "Atualização do software.",
            },
            basePrice: {
              type: "integer",
              description: "Preço da categoria.",
              example: 200,
            },
            isActive: {
              type: "boolean",
              description: "Indica se a categoria esta ativa.",
              example: true,
            },
          },
        },
        Service: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "O ID único do serviço.",
              example: 10,
            },
            title: {
              type: "string",
              description: "Título do serviço.",
              example: "Atualização do software.",
            },
            description: {
              type: "string",
              description: "Descrição do problema.",
              example: "Estou tendo problemas com...",
            },
            categoryId: {
              type: "integer",
              description: "O Id da categoria.",
              example: 2,
            },
            clientId: {
              type: "integer",
              description: "O Id do cliente.",
              example: 10,
            },
            techId: {
              type: "integer",
              description: "O Id do técnico",
              example: 5,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
