const error404 = (req, res) => {
  res
    .status(404)
    .render("error", {
      title: "Error 404 Not Found",
      message: "La página que estás buscando no existe.",
    });
};

export default {
  error404,
};
