const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const userRoutes = require("./routes/user");

const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");

const swaggerDefinition = yaml.load("./swagger.yaml");
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDefinition));

require("dotenv-flow").config();

app.use(bodyParser.json());

mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((e) => console.log("Erro ao conectar ao mongoDB: " + e));

mongoose.connection.once("open", () =>
  console.log("Conectado ao banco no MongoDB")
);

//route
app.get("/api/hello", (req, res) => {
  res.status(200).send({ message: "Hello World!" });
});
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("Server rodando na porta " + PORT);
});

module.exports = app;
