# Backend — Todo REST API

A minimal Express server with an **in-memory** todo store (no database). State
resets whenever the server restarts.

## Run

```bash
npm install
npm run dev    # auto-restart on changes (node --watch)
# or
npm start
```

Server listens on `http://localhost:4000` (override with `PORT`).

## Endpoints

| Method | Path             | Description                     |
| ------ | ---------------- | ------------------------------- |
| GET    | `/api/todos`     | List all todos                  |
| GET    | `/api/todos/:id` | Get one todo                    |
| POST   | `/api/todos`     | Create `{ title }`              |
| PUT    | `/api/todos/:id` | Update `{ title?, completed? }` |
| DELETE | `/api/todos/:id` | Delete a todo (204)             |

CORS is enabled for all origins so the Next.js frontend can call it directly.
