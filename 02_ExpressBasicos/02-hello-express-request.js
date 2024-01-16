import express from "express";

// iniciar express:
const app = express();

app.get("/", (req, res) => {
  res.end("<h1>Hola mundo desde Express.js</h1>");
});

app.get("/user/:id-:name-:age", (req, res) => {
  //Ejemplo: http://localhost:3000/user/19-Sergio-45
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end(`
    <h1>
      ${req.params.name}, bienvenido a Express.js.
    </h1>
    <h2>
      Tienes ${req.params.age} años y tu ID es ${req.params.id}
    </h2>
  `);
});

app.get("/search", (req, res) => {
  //Ejemplo: http://localhost:3000/search?id=19&name=Sergio&age=45
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end(`
    <h1>
      ${req.query.name}, bienvenido a Express.js.
    </h1>
    <h2>
      Tienes ${req.query.age} años y tu ID es ${req.query.id}
    </h2>
  `);
});

app.listen(3000, () => {
  console.log("Express desde http://localhost:3000");
});
