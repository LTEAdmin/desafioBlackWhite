const express = require("express");
const jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

//rutas estaticas a traves de middlewares
app.use("/css", express.static(path.join(__dirname, "/assets/css")));
app.use("/img", express.static(path.join(__dirname, "/assets/img")));
app.use("/views", express.static(__dirname + "/views"));

//ruta home
app.get("/", (req, res) => {
  res.sendFile("/views/index.html", { root: __dirname });
});


app.get("/convertir", async (req, res) => {
    const { imagen } = req.body;
    console.log(imagen)
    if (!imagen) {
        return res.status(400).json({ msg: "No se ha proporcionado una imagen" });
    }
    try {

        // crea path y guarda imagen
        console.log(imagen);
        const img = await jimp.read(imagen);
        const id = uuidv4().slice(0, 6);
        const name = `/img-${id}.jpg`;
        const pathImg = path.join(__dirname, "/img", name);
        await imagen
            .greyscale()
            .resize(350, jimp.AUTO)
            .img.writeAsync(pathImg)
        res.sendFile(pathImg);
    }
    catch (error) {
        console.log(error);
    }
});

//ruta generica
app.get("*", (req, res) => {
  res.status(404).send("Pagina no encontrada, por favor revise la URL");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
