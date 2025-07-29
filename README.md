# 📰 Medium Blog Clone

A full-featured Medium-style blogging platform built with a modern, edge-native full-stack architecture.

---

## 🚀 Tech Stack

- **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [Cloudflare Workers](https://workers.cloudflare.com/) + [Hono.js](https://hono.dev/)
- **Validation & Types**: [Zod](https://zod.dev/) (for runtime validation + frontend type inference)
- **ORM**: [Prisma](https://www.prisma.io/) with connection pooling
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: JSON Web Tokens (JWT)

---

## 🌐 Features

- 🔐 Secure authentication with JWT
- ✍️ Create, edit, and delete blog posts
- 📖 Public feed with individual post pages
- 🧩 Zod-based validation with shared types between client and server
- ⚡ Deployed on Cloudflare Workers for 24/7 availability
- 🧵 Efficient database access using Prisma connection pooling

---

## 🎯 Project Highlights

- **Edge deployment**: Using Cloudflare Workers ensures minimal latency and global availability.
- **Type-safe stack**: TypeScript + Zod allow end-to-end type safety, reducing runtime errors.
- **Connection pooling**: Implemented **Prisma Accelerate** to optimize concurrent DB access in serverless environments.
- **Learning takeaway**: Gained strong understanding of connection pooling and how to maintain high availability in serverless architectures.

---

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/scewdoosh/blog
   cd medium-clone
