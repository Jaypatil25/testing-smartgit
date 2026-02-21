const express = require('express');
const todosRouter = require('./routes/todos');

const app = express();
app.use(express.json());

app.use('/api/todos', todosRouter);

app.get('/', (req, res) => {
  res.send({ message: 'Todo API (in-memory). Use /api/todos' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
