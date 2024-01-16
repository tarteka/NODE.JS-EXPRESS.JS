import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskController from "./controllers/taskController.js";
import errorController from "./controllers/errorController.js";

// Especificar la variable de "__dirname".
const __dirname = path.dirname(new URL(import.meta.url).pathname).slice(1);

// Instanciar express
const app = express();
const port = 3000;

// MIDDLEWAREs:
  // Gestionar las políticas de mismo origen en la aplicación.
app.use(cors());
  // Gestionar y configurar encabezados HTTP
app.use(helmet());
  // Realizar el registro (logging) de las solicitudes en modo desarrollo.
app.use(morgan("dev"));
  // Analizar el cuerpo de las solicitudes con formato JSON.
app.use(express.json());
  // Analizar los datos de formularios HTML.
app.use(express.urlencoded({extended: false}));
  // Servir archivos estáticos desde la carpeta "public".
app.use(express.static(path.join(__dirname, "public")));

// Motor de vistas (usaremos pug: https://pugjs.org)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// RUTAS
app.get("/", taskController.getAllTasks);
app.get("/add", taskController.getAddTaskForm);
app.post("/add", taskController.addTask);
app.get("/edit/:id", taskController.getEditTaskForm);
app.post("/edit/:id", taskController.editTask);
app.get("/complete/:id", taskController.completeTask);
app.get("/uncomplete/:id", taskController.uncompleteTask);
app.get("/delete/:id", taskController.deleteTask);
app.use(errorController.error404);

app.listen(port, () => {
  console.log(`App iniciada en http://localhost:${port}`);
})

