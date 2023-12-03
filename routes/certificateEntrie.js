const router = require("express").Router();
const certificateEntrie = require("../models/certificateEntries");
const upload = require("../middleware/upload.js");
const path = require("path");
const {verifyToken} = require("../validation")

//CREATE
router.post("/upload", verifyToken, upload.single("file"), (req, res) => {
  data = req.body;

  let certificate = new certificateEntrie({
    name: data.name,
    description: data.description,
    email: data.email,
    date: Date.now(),
  });

  if (req.file) {
    certificate.file = req.file.path;
  }

  certificate
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
});

//GET SINGLE
router.get("/:filename", verifyToken, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(process.cwd() + '/uploads', filename);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  res.sendFile(filePath, (e) => {
    if (e) {
      res.status(404).send("Arquivo não encontrado");
    }
  });
});


router.get("/getAll/:status", verifyToken, async (req, res) => {
  const { status } = req.params;

  var certificados = await certificateEntrie.find({ validated: status })

  res.json({
    certificados: certificados
  });

});

//UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;

  certificateEntrie
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Certificado não encontrado" });
      } else {
        res.send({ message: "Certificado atualizado com sucesso" });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: "Erro ao atualizar: " + e.message });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  certificateEntrie
    .findByIdAndDelete(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Certificado não encontrado" });
      } else {
        res.send({ message: "Certificado excluido com sucesso" });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: "Erro ao excluir: " + e.message });
    });
});

module.exports = router;
