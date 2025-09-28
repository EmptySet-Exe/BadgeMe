# C/Frontend/Dockerfile
# Multi-stage build for Next.js using pnpm. Runner has pnpm available and installs prod deps.

#########################
# Stage 1 — builder
#########################
FROM node:20-alpine AS builder
WORKDIR /app

# Provide corepack/pnpm for builder (used for build step)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifest + lockfile (if present)
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (dev + prod) for build
RUN pnpm install --frozen-lockfile || pnpm install

# Copy source
COPY . .

# Build the Next app
RUN pnpm build

#########################
# Stage 2 — runner
#########################
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Make pnpm available in the runtime
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only the built assets and package manifest
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install production dependencies (uses pnpm that we enabled above)
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

EXPOSE 3000

# Ensure "start" script exists in package.json e.g. "start": "next start -p 3000"
CMD ["pnpm", "start"]
