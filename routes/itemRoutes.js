const express = require("express");
const itemRouter = express.Router();
const Item = require("../models/Item");

itemRouter.get("/item-list", async (req, res) => {
  try {
    const itemList = await Item.find();
    res.send({ data: itemList, status: 200 });
  } catch (error) {
    res.send({ data: "error al cargar lista de items " + error, status: 400 });
  }
});
itemRouter.post("/user-list", async (req, res) => {
  try {
    console.log("la lista q se busca es del usuario:", req.body);
    const itemList = await Item.find({ admin_id: req.body._id });

    res.send({ data: itemList, status: 200 });
  } catch (error) {
    res.send({ data: "error al cargar lista de items " + error, status: 400 });
  }
});
itemRouter.post("/add-item", validarCampos, async (req, res) => {
  try {
    const { admin_id, concepto, monto, fecha, tipo } = req.body;
    const item = new Item({ admin_id, concepto, monto, fecha, tipo });
    const data = await item.save();
    res.send({ data: data, status: 200 });
  } catch (error) {
    res.send({ data: "error al cargar item " + error, status: 400 });
  }
});

itemRouter.put("/item-update/:id", async (req, res) => {
  try {
    const { admin_id, concepto, monto, fecha, tipo } = req.body;
    const id = req.params.id;
    const itemActualizado = { admin_id, concepto, monto, fecha, tipo };
    const data = await Item.findByIdAndUpdate(id, itemActualizado);
    res.send({ status: 200, data: data });
  } catch (error) {
    console.log("el error es:", error);
    res.send({
      status: 400,
      data: "error al actualizar item",
      error: error,
    });
  }
});

itemRouter.delete("/item/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    console.log(`El item ${req.params.id}  fue borrado!`);

    res.send({
      data: `el item  ${req.params.id} fue Eliminada!`,
      status: 200,
    });
  } catch (error) {
    res.send({ data: "error al borrar item " + error, status: 400 });
  }
});

//MIDDLEWARE FUNCTIONS
async function validarCampos(req, res, next) {
  try {
    if (req.body.admin_id === "" || req.body.concepto === "") {
      res.send({ data: "Complete todos los campos", status: 400 });
    } else {
      next();
    }
  } catch (error) {
    console.log({ data: "error al validar los campos", status: 500 });
  }
}
module.exports = itemRouter;
