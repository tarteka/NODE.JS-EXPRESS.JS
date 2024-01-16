import { parse } from "url";

const urlString = "https://www.ejemplo.com:8080/ruta?parametro1=valor1&parametro2=valor2";

const parsedUrl = parse(urlString, true)

console.log("Protocolo:", parsedUrl.protocol);
console.log("Hostname (dominio):", parsedUrl.hostname);
console.log("Pathname (ruta):", parsedUrl.pathname);
console.log("Parámetros de consulta:", parsedUrl.query);
