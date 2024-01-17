import express from "express";
//módulo promesas de fileSystem (fs):
import fs from "fs/promises"
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fm from "front-matter";
import markdownIt from "markdown-it";


// Instanciar express
const app = express();
const port = process.env.PORT || 3000;

// Especificar la variable de "__dirname".
const __dirname = path.dirname(new URL(import.meta.url).pathname).slice(1);

// MIDDLEWAREs:
  // Realizar el registro (logging) de las solicitudes en modo desarrollo.
app.use(morgan("dev"));
  // Analizar el cuerpo de las solicitudes con formato JSON.
app.use(express.json());
  // Analizar los datos de formularios HTML.
app.use(express.urlencoded({extended: false}));
  // Trabajar con cookies
app.use(cookieParser());

  // Servir archivos estáticos desde la carpeta "public".
app.use(express.static(path.join(__dirname, "public")));

// Motor de vistas (usaremos pug: https://pugjs.org)
app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "pug");

// Rutas dinámicas desde archivos en la carpeta "pages" (que no son .pug)
const pagesDir = path.join(__dirname, "pages");
const files = await fs.readdir(pagesDir);

// Lógica para archivos html y md
for (let file of files) {
  const filePath = path.join(pagesDir, file);
  let extName = path.extname(file);

  console.log(file, filePath, extName);

  if (extName === ".md" || extName === ".pug" || extName === ".html") {
    let fileName = path.basename(file, extName);
    console.log(fileName);

    app.get(`/${fileName}`, async (req, res) => {
      try {
        if (extName === ".pug") {
          res.render(fileName);
        } else if (extName === ".html") {
          res.sendFile(filePath);
        } else { //markdown
          let fileContent = await fs.readFile(filePath, "utf-8");
          let { attributes: fronMatterAttributes, body } = fm(fileContent);

          let attributes = fronMatterAttributes

          let contentHTML = markdownIt().render(body);
          res.render("layout-md", {...attributes, contentHTML});
        }
      } catch (err) {
        res.status(404).render("error-404");
      }
    });
  };
};

// RUTAS
  // index:
app.get("/", (req, res) => {
  res.render("index");
});
  // error 404
app.use((req, res) => {
  res.status(404).render("error-404");
});


app.listen(port, () => {
  console.log(`Sitio Web iniciado en http://localhost:${port}`);
})