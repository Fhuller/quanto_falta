const router = require("express").Router();
const Entrie = require("../models/certificateEntries");

//GET ALL
router.get("/", (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
});

//GET SINGLE
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({ message: "Usuario não encontrado" });
    });
});

//CREATE
router.post("/", (req, res) => {
  data = req.body;

  User.insertMany(data)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
});

//UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Usuario não encontrado" });
      } else {
        res.send({ message: "Usuario atualizado com sucesso" });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: "Erro ao atualizar: " + e.message });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  user
    .findByIdAndDelete(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Usuario não encontrado" });
      } else {
        res.send({ message: "Usuario excluido com sucesso" });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: "Erro ao excluir: " + e.message });
    });
});
