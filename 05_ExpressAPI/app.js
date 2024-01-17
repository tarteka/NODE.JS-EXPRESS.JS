import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskController from "./controllers/taskController.js";
import errorController from "./controllers/errorController.js";

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


// RUTAS
app.get("/tasks", taskController.getAllTasks);
app.post("/tasks", taskController.addTask);
app.get("/tasks/:id", taskController.getTask);
app.put("/tasks/:id", taskController.editTask);
app.put("/tasks/complete/:id", taskController.completeTask);
app.put("/tasks/uncomplete/:id", taskController.uncompleteTask);
app.delete("/tasks/:id", taskController.deleteTask);

app.use(errorController.error404);

app.listen(port, () => {
  console.log(`APIrest iniciada en http://localhost:${port}/tasks`);
})

