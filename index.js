const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('*', (req, res) => {
    res.status(404).send('Pagina no encontrada, por favor revise la URL');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});