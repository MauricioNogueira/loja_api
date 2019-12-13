const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

const routes = require("./routes");
routes(app);

const port = 8080;
const host = "localhost";

app.listen(port, host, function(){
    console.log("API Rodando");
    console.log(`Acesso: http://${host}:${port}`);
});