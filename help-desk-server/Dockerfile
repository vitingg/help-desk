# ---- Stage 1: build ----
  FROM node:20-alpine AS builder
  WORKDIR /app
  
  # Copiar package.json e instalar deps
  COPY package*.json ./
  RUN npm install
  
  # Copiar o restante do código fonte
  COPY . .
  
  # Gerar o Prisma Client
  RUN npx prisma generate
  
  # Compilar o TypeScript
  RUN npm run build
  
  # ---- Stage 2: production ----
  FROM node:20-alpine
  WORKDIR /app
  
  ENV NODE_ENV=production
  
  # Copiar package.json do estágio de build e instalar apenas deps de prod
  COPY --from=builder /app/package*.json ./
  RUN npm install --omit=dev
  
  # Copiar os artefatos da aplicação
  COPY --from=builder /app/dist ./dist
  COPY --from=builder /app/prisma ./prisma
  COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
  COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

  RUN npx prisma generate
  
  EXPOSE 3000
  
  # Comando explícito para iniciar a aplicação, garantindo que os aliases funcionem
  CMD [ "node", "dist/server.js" ]