# Technical Spec --- Smart Pen (Production-Level Demo)

Date: 2026-04-03

## 1. Stack

Frontend: - Next.js (App Router, TypeScript) - TailwindCSS - Framer
Motion - Deploy: Cloudflare Workers

Backend: - NestJS (TypeScript) - Drizzle ORM - PostgreSQL (Neon
Serverless) - Deploy: Render

Infra: - Resend (email) - Optional: Upstash Redis (rate limit)

## 2. Architecture

Client (Edge) → API (NestJS) → Neon DB

## 3. Frontend Structure

/app /(marketing) /auth /beta /dashboard /components /lib (api, utils)

## 4. Backend Modules

-   AuthModule (JWT, bcrypt)
-   UsersModule
-   BetaModule

## 5. Database (Drizzle)

users: - id (uuid) - email (unique) - password_hash - verified (bool) -
created_at

beta_requests: - id (uuid) - user_id (fk) - status ('waiting' \|
'invited') - created_at

## 6. API

POST /auth/register POST /auth/login GET /user/me

POST /beta/join GET /beta/status

## 7. Simulation Layer

-   position = random(50--500)
-   decreasing on refresh
-   dashboard returns mocked states:
    -   device: connected
    -   sync: active
    -   ai: beta

## 8. Security

-   bcrypt hashing
-   JWT access tokens
-   basic rate limiting
-   CORS

## 9. Performance

-   Edge rendering (CF)
-   image/video optimization
-   code-splitting

## 10. Deploy

-   Front: CF Workers (Next adapter)
-   Back: Render (Docker optional)
-   DB: Neon
