import express from 'express';
import usersRouter from './routes/users.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('RESTful API is running');
});

app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
