const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//rutas estaticas a traves de middlewares
app.use('/css', express.static(__dirname + '/css'));
app.use('/views', express.static(__dirname + '/views'));

//ruta home 
app.get('/', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname });
});

//ruta generica
app.get('*', (req, res) => {
    res.status(404).send('Pagina no encontrada, por favor revise la URL');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});