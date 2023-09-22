const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  //Encriptando a senha
  const salt = await bcrypt.genSalt(10);
  const pwd = await bcrypt.hash(req.body.pwd, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    pwd,
    date: Date.now(),
  });

  try {
    const savedUser = await user.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error: "Email não encontrado" });
  }

  const validPassword = await bcrypt.compare(req.body.pwd, user.pwd);

  if (!validPassword) {
    return res.status(400).json({ error: "Senha não coincide" });
  }

  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
});

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

module.exports = router;
