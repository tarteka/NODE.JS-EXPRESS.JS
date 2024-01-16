import express from "express";
import { resolve } from "path";

// iniciar express:
const app = express();

app.get("/", (req, res) => {
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.send("<h1>Hola mundo desde Express.js con el método send</h1>");
  //res.end("<h1>Hola mundo desde Express.js con el método end</h1>");

});


app.get("/json", (req, res) => {
  res.set({ "Content-Type": "application/json; charset=utf-8" });
  res.json({
    name: "Sergio",
    age: 39,
    youtube: "@tarteka"
  })
});

app.get("/archivo", (req, res) => {
  res.sendFile(resolve("index.html"));
});

app.get("/plantilla", (req, res) => {
  // no funciona. Falta configurar el motor de plantillas.
  res.render("plantilla") //plantilla.njk
});

app.get("/tarteka", (req, res) => {
  res.redirect(301, "http://localhost:3000/archivo")
});


app.listen(3000, () => {
  console.log("Express desde http://localhost:3000");
});
