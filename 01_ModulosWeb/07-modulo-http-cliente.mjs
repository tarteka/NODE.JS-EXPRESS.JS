import { get } from "https";

const urlSite = {
  hostname: "jonmircha.com",
  port: 443,
  path: "/cursos",
};

get(urlSite, (res) => {
  console.log(`El sistio ${urlSite.hostname} ha respondido Código: ${res.statusCode}. Mensaje: ${res.statusMessage}.`);
}).on("error", (err) => {
  console.log(`El sistio ${urlSite.hostname} NO ha respondido Código: ${err.code}. Mensaje: ${err.message}.`);
});
