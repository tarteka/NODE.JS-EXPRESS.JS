import { join } from "path";

const directorio = "/ruta/principal";
const archivo = "archiv.txt";

const rutaCompleta = join(directorio, archivo);

console.log("Ruta completa:", rutaCompleta);