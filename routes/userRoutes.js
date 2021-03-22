const express = require("express");
//const { findUser } = require("../middlewares/middlewares");
const userRouter = express.Router();
const User = require("../models/User");

userRouter.get("/usuarios", async (req, res) => {
  try {
    const userList = await User.find();
    res.send({ data: userList, status: 200 });
  } catch (error) {
    res.send({
      data: "error al cargar lista de usuarios " + error,
      status: 400,
    });
  }
});

userRouter.post("/login", findUser, async (req, res) => {
  try {
    const { email, password } = req.body;

    res.send({ data: res.body, status: 200 });
  } catch (error) {
    res.send({ data: "error al loguearse" + error, status: 400 });
  }
});

userRouter.post("/register", emailExist, async (req, res) => {
  try {
    const { email, password, nombre, role } = req.body;
    const usuario = new User({ email, password, nombre, role });

    const data = await usuario.save();
    res.send({
      status: 200,
      mensaje: `El usuario ${email} , se agrego! y ${data}`,
      data: data,
    });
  } catch (error) {
    res.send({ data: "error al agregar el usuario " + error, status: 400 });
  }
});

userRouter.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log(`la aplicacion ${req.params.id}  fue borrado!`);

    res.send({
      data: `el usuario ${req.params.id} fue Eliminada!`,
      status: 200,
    });
  } catch (error) {
    res.send({ data: "error al borrar usuario " + error, status: 400 });
  }
});

async function findUser(req, res, next) {
  try {
    const data = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (data) {
      res.body = data;
      next();
    } else {
      res.send({ data: "Usuario o clave incorrectas", status: 400 });
    }
  } catch (error) {
    console.log("error al ejecutar el buscador de usuario", error);
  }
}

async function emailExist(req, res, next) {
  try {
    const data = await User.findOne({ email: req.body.email });

    if (data) {
      res.send({ data: "el email ya esta en uso....", status: 400 });
    } else {
      next();
    }
  } catch (error) {
    console.log("error al validar si existe email", error);
  }
}
module.exports = userRouter;
