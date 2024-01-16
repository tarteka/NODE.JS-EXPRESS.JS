import express from "express";

// iniciar express:
const app = express();

app.get("/", (req, res) => {
  res.end("<h1>Hola mundo desde Express.js</h1>");
  console.log(res);
  console.log(req);
});

app.listen(3000, () => {
  console.log("Express desde http://localhost:3000");
});
