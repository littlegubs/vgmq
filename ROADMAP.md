# VGMQ Modernization Roadmap

This document tracks the incremental modernization of the legacy VGMQ codebase (`vgmq` + `vgmq-api`) inside a single `pnpm` + Turborepo monorepo.

---

## Core Principles

1. **No "from 0" rewrite:** Modernize incrementally inside the legacy codebase so every phase leaves the application buildable, testable, and shippable.
2. **Keep Angular & 100% of legacy gameplay/business rules:** Never drop or silently alter legacy game logic (`allowCollectionAnswer`, answer reveal media, cover `colorPalette`, public/custom lobby behaviors, etc.) without an explicit decision.
3. **Reuse proven architecture from `vgmq-v2`:** Bring over self-contained technical improvements and packages from `vgmq-v2` where they make sense:
   - Client-side `FuseWorker` (`fuse.js/worker`) + IndexedDB search instead of Elasticsearch
   - Ephemeral live lobby state in **Redis + BullMQ** instead of heavy SQL polling/locks
   - **PostgreSQL 16 + Drizzle ORM** (plus `migrate-legacy` script) instead of MySQL + TypeORM
   - **GCP Terraform** (`Cloud Run` + private `Cloud SQL` + COS `Redis VM` + `GCS` + `Secret Manager`) instead of a single SSH server
   - **Spartan UI (`@spartan-ng/brain` + `@spartan-ng/cli`)** + **SimUI (`simui.dev`)** copy-paste components with Tailwind instead of Bootstrap / MDBootstrap / Angular Material.
4. **Keep Admin & Public Unified Through Phases 1–5:** Keep `/admin` lazy-loaded inside `apps/web` (already behind `AdminGuard`, 0 KB impact on players) and keep `apps/api` as a single unified NestJS backend (avoiding cross-subdomain cookie issues and preserving Cloud SQL connection headroom). Revisit optional `apps/admin` extraction in Phase 6 once Standalone + Spartan UI is complete.
5. **Step-by-Step Commits:** Commit locally at the end of every verified sub-step (only after `pnpm run build` and relevant checks pass). Keep commits clean and focused; never push to remote without explicit confirmation.

---

## Modernization Phases & Checklist

### Phase 1: Monorepo (`pnpm` + Turborepo) & Stack Upgrades
- [x] **1.1** Restructure into `pnpm` + Turborepo workspace (`apps/web` for Angular, `apps/api` for NestJS, `packages/` for shared libraries) while preserving `ng deploy` (`gh-pages`).
- [x] **1.2** Upgrade `apps/api` dependencies (Node 26 LTS, migrate `@nestjs/bull` -> `@nestjs/bullmq` + `bullmq` v6, upgrade `redis` v4 -> v5 via `createNodeRedisClient` matching `vgmq-v2` with zero `ioredis`, ESLint fix, pre-existing bug fixes, and `pnpm audit` fixes).
- [ ] **1.3** Upgrade `apps/api` to **NestJS 12** + **TypeScript 6** (`@nestjs/*` v12 pure-ESM packages, `nestjs-pino` v5, `@nestjs/bullmq` v12, remove deep `@nestjs/*` imports such as `@nestjs/websockets/interfaces/nest-gateway.interface`, update `tsconfig`/Jest config).
- [ ] **1.4** Upgrade `apps/web` dependencies (Angular 21/22 + `@types/node` v26, `jwt-decode` v4, `luxon` v3, ESLint 9 flat config).

### Phase 2: Kill Elasticsearch -> Fuse.js + IndexedDB
- [ ] **2.1** Add `GET /games/search-index` with ETag caching in `apps/api` (supporting games, alternative names, and collections for `allowCollectionAnswer`).
- [ ] **2.2** Port `FuseWorker` (`fuse.js/worker`) + IndexedDB (`idb`) dataset cache into an Angular `GameSearchService` and wire `AnswerSelectComponent`.
- [ ] **2.3** Remove `@nestjs/elasticsearch`, `@elastic/elasticsearch`, `populate-elasticsearch.ts`, and Elasticsearch calls in subscribers/docker-compose.

### Phase 3: Live Lobbies & WebSockets in Redis + BullMQ
- [ ] **3.1** Move ephemeral lobby state (`Lobby`, `LobbyUser`, `LobbyMusic`, `LobbyMessage`, filters, vote-skip locks, round timers) from MySQL/TypeORM to Redis + BullMQ while preserving legacy WebSocket event names and gameplay rules.
- [ ] **3.2** Remove TypeORM lobby subscribers (`lobby.subscriber.ts`, `lobby-user.subscriber.ts`, `lobby-music.subscriber.ts`) and drop ephemeral `lobby_*` SQL tables.

### Phase 4: Database & ORM Migration (MySQL + TypeORM -> PostgreSQL 16 + Drizzle ORM)
- [ ] **4.1** Audit legacy persistent tables/columns with user (e.g., cover `colorPalette`, answer reveal `video`/`screenshots`, etc.) to decide what to keep in Drizzle schema.
- [ ] **4.2** Port `packages/db` (Drizzle schema + `migrate-legacy` script) from `vgmq-v2` and test full data migration against `Dump20260410.sql`.
- [ ] **4.3** Refactor remaining NestJS services (`users`, `games`, `igdb`, `oauth`, `lobby-music-loader`) from TypeORM to Drizzle and remove `typeorm` & `mysql2`.

### Phase 5: GCP Terraform Infrastructure & CI/CD
- [ ] **5.1** Adapt `vgmq-v2/infra` (Terraform for Cloud Run, Cloud SQL Postgres 16 on private IP, COS Redis VM with AOF persistent disk, GCS buckets, Secret Manager). Address heavy admin MP3 uploads (up to 200 files / 150 MB in `admin-games.controller.ts`) vs. Cloud Run's 32 MB HTTP/1.1 request body limit (e.g., GCS signed upload URLs + BullMQ processing or HTTP/2).
- [ ] **5.2** Set up GitHub Actions workflows for Terraform (`terraform.yml`, `infra-power.yml`) and deployments (`deploy-back.yml` for Cloud Run, `deploy-front.yml` for GitHub Pages / Cloudflare Pages).

### Phase 6: Angular UI Modernization (Standalone + Tailwind v4 + Spartan UI + SimUI)
- [ ] **6.1** Run Angular Standalone migration schematic (`ng g @angular/core:standalone`) and modern control flow migration.
- [ ] **6.2** Install Spartan UI (`@spartan-ng/brain` + `@spartan-ng/cli`) + Tailwind, remove `mdb-angular-ui-kit` and `bootstrap`, and progressively replace Angular Material views using Spartan + SimUI components.
- [ ] **6.3** (Optional) Extract `/admin` module into a separate `apps/admin` Angular app in the monorepo if desired.

---

## Repository & Deployment Notes

- **Legacy `vgmq-api` repo:** Left untouched during Phases 1–4 so existing tag-triggered SSH deployment (`.github/workflows/deploy.yml`) continues working uninterrupted until GCP cutover in Phase 5.
- **GitHub Pages (`gh-pages` branch):** `apps/web/angular.json` retains `angular-cli-ghpages:deploy` (`dir: "dist/browser"`). Running `pnpm run deploy:web` pushes the compiled client bundle and `CNAME` to the `gh-pages` branch root as before.

---

## Session Handoff Guide

When starting a new AI session to continue this work, prompt with:

> `Read ROADMAP.md and let's plan the next unchecked step.`

At the end of each completed sub-step, update the checklist above (`- [x]`) and add a brief note below if any key decision or deviation occurred.

### Session Log
- **Phase 1.1 completed (`feat/monorepo`):** Merged full git histories of `vgmq` (`apps/web`) and `vgmq-api` `v0.44.0` (`apps/api`). Configured `pnpm@12.21.0` + Turborepo workspace (`pnpm-workspace.yaml`, `turbo.json`, `package.json`, `.gitignore`), removed deprecated empty `@types/bull` & `@types/cache-manager` stubs, agreed to keep `/admin` unified through Phases 1–5 and commit step-by-step, and verified `pnpm install` + `pnpm run build` pass with exit code 0.
- **Phase 1.2 completed (`feat/monorepo`):** Standardized monorepo on Node 26 LTS (`.nvmrc` `v26.5.0`, `engines.node >= 26`, `@types/node@^26` in `apps/api`; kept `apps/web` `@types/node@^18.19.86` until Angular + TypeScript upgrade in Phase 1.4). Migrated `@nestjs/bull` + `bull` -> `@nestjs/bullmq` (`11.0.5`) + `bullmq` (`6.7.10`) and upgraded `redis` `4.7.1` -> `5.12.4` using `createNodeRedisClient` (matching `vgmq-v2`, zero `ioredis`). Ported `LobbyProcessor`, `GameProcessor`, and `IgdbWebhookProcessor` to `WorkerHost` + `@OnWorkerEvent`, fixed pre-existing `SCAN` cursor loop in `LobbyStatService` and `@InjectRepository(User)` typo in `IgdbWebhookProcessor`, added missing `@eslint/js` & `globals` devDeps in `apps/api`, resolved `pnpm audit` critical/high advisories (`axios`, `bcrypt` v6, `nodemailer` v10, `pm2` v7, `uuid` override in `pnpm-workspace.yaml`), and split NestJS 12 + TypeScript 6 into Phase 1.3.
