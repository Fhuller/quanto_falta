//#region Const Definition

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/user");
const certificateRoutes = require("./routes/certificateEntrie");
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDefinition = yaml.load("./swagger.yaml");
const PORT = process.env.PORT || 4000;
require("dotenv-flow").config();

//#endregion

//#region Conexão ao mongoDB

mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((e) => console.log("Erro ao conectar ao mongoDB: " + e));

mongoose.connection.once("open", () =>
  console.log("Conectado ao banco no MongoDB")
);

//#endregion

//#region AppConfig

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDefinition));
app.use(bodyParser.json());

app.listen(PORT, function () {
  console.log("Server rodando na porta " + PORT);
});

module.exports = app;

//#endregion

//#region Routes

app.use("/api/users", userRoutes);
app.use("/api/certificate", certificateRoutes);

//#endregion