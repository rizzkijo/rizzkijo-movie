FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm" PATH="$PNPM_HOME:$PATH" NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat && corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch

FROM base AS builder
WORKDIR /app
COPY --from=deps /pnpm /pnpm
COPY --from=deps /root/.local/share/pnpm /root/.local/share/pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --offline

# 👉 hanya kalau kamu MEMANG butuh NEXT_PUBLIC_* saat build/SSG:
COPY .env.production ./.env.production

COPY . .
RUN pnpm build && pnpm prune --prod

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
