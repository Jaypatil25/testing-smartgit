# In-memory Todo API

Simple Express backend exposing todo API endpoints in-memory (no database).

Endpoints:

- GET /api/todos — list all todos

- POST /api/todos — create a todo (body: { title: string, completed?: boolean })
- PUT /api/todos/:id — replace a todo (body: { title: string, completed: boolean })
- PATCH /api/todos/:id — partial update
- DELETE /api/todos/:id — delete a todo

Run locally:

```bash
npm install
npm start
# or for development with auto-reload:
npm run dev
```

Server starts on port 3000 by default. Set `PORT` to change it.
