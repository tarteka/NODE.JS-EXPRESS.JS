import { createServer } from "http";
import { get } from "https";

const hostName = "localhost";
const port = 3000;
const options = {
  host: "jonmircha.com",
  port: 443,
  path: "/cursos"
};

let htmlCode = "";

const httpsClient = res => {
  console.log(`El sitio ${options.host} ha respondido. Código: ${res.statusCode}. Mensaje: ${res.statusMessage}.`);

  res.on("data", data => {
    htmlCode += data;
    console.log(data.toString());
  })
};

const httpsError = err => {
  console.error(`El sitio ${options.host} NO ha respondido. Código: ${err.code}. Mensaje: ${err.message}.`);
};

const webServer = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(htmlCode);
};

//instancia cliente HTTP o HTTPS
get(options, httpsClient).on("error", httpsError);

//instancia servidor local HTTP
createServer(webServer).listen(port, hostName, () => {
  console.log(`Servidor corriendo en http://${hostName}:${port}`);
});