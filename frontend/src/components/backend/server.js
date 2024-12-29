const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();

server.use(middleware);
server.use(router);

const port = 5000;

server.listen(port, () => {
  console.log(`Json server esta rodando na porta : ${port}`);
});


//para iniciar o json serve npm run backend   