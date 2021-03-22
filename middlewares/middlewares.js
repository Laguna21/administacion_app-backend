exports.module = async function findUser(req, res, next) {
  try {
    const data = await Usuario.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (data) {
      req.body = data;
      next();
    } else {
      res.send({ data: "error al loguear", status: 400 });
    }
    //console.log("estas buscando a alguien rey?", data.id);
  } catch (error) {
    console.log("error al ejecutar el buscador de usuario", error);
  }
};
