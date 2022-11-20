const http = require("http");
const { URL } = require("url");

const bodyParser = require("./helpers/bodyParser");
const routes = require("../routes");

const server = http.createServer((request, response) => {
  const parseUrl = new URL(`http://localhost:3005${request.url}`);
  console.log(
    `Request method ${request.method} | Endpoint ${parseUrl.pathname} `
  );

  let { pathname } = parseUrl;
  let id = null;

  const splitEndpoint = pathname
    .split("/")
    .filter((routeItem) => Boolean(routeItem));

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }
  
  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  );

  if (route) {
    request.query = Object.fromEntries(parseUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { "Content-Type": "application/json" });
      response.end(JSON.stringify(body));
    };

    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(`Cannot ${request.method} ${parseUrl.pathname}`);
  }
});

server.listen(3005, () =>
  console.log("server started at http://localhost:3005")
);
