let tasks = [
  { id: 1, title: "Tarea 1", completed: false },
  { id: 2, title: "Tarea 2", completed: true },
  { id: 3, title: "Tarea 3", completed: false },
  { id: 4, title: "Tarea 4", completed: false },
];

const getAllTasks = (req, res) => {
  res.json({ tasks });
};

const addTask = (req, res) => {
  let { title } = req.body;

  console.log(req.body);
  console.log(title);

  if (!title) {
    res.status(404).json({ err: true, message: "Tarea no agregada. Falta el título." });
  } else {
    let id = tasks.length + 1;
    tasks.push({ id, title, completed: false });
    res.json({ err: false, message: "Tarea agregada con éxito." });
  }
};

const getTask = (req, res) => {
  let id = parseInt(req.params.id);
  let taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ err: true, message: "Tarea no encontrada." });
  } else {
    res.json({task:tasks[taskIndex] });
  }
};

const editTask = (req, res) => {
  let id = parseInt(req.params.id);
  let taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ err: true, message: "Tarea no encontrada." });
  } else {
    tasks[taskIndex].title = req.body.title;
    res.json({ err: false, message: "Tarea agregada con éxito." });
  }
};

const completeTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = true;
    res.json({ err: false, message: "Tarea completada." });
  } else {
    res.status(404).json({ err: true, message: "Tarea no encontrada." });
  }
};

const uncompleteTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = false;
    res.json({ err: false, message: "Tarea no completada." });
  } else {
    res.status(404).json({ err: true, message: "Tarea no encontrada." });
  }
};

const deleteTask = (req, res) => {
  let id = parseInt(req.params.id);
  let taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ err: true, message: "Tarea no encontrada." });
  } else {
    tasks.splice(taskIndex, 1);
    res.json({ err: false, message: "Tarea eliminada." });
  }
};

export default {
  getAllTasks,
  addTask,
  getTask,
  editTask,
  completeTask,
  uncompleteTask,
  deleteTask,
};
