// generated by @ng-toolkit/universal
const port = process.env.PORT || 4000;

const server = require('./dist/server');

server.app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
