FROM node:16-alpine AS builder

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY ["vite.config.ts", "index.html", "tsconfig.json", "tsconfig.node.json", "./"]
COPY ./public* ./public
COPY ./src ./src
RUN npm run build

FROM nginx:1.22
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist/ /var/www/frontend/
