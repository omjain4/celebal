
import express from 'express';

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.get('/about', (req, res) => {
    res.send('This is the About Page.');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
