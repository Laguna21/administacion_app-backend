const mongoose = require("mongoose");

const uri = require("./config/config").uriDB;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("conectado con la base de datos de mongodb!"))
  .catch((err) =>
    console.log(`error al conectarse a la base de datos... --->${err}`)
  );
/* 
try {
  const db = async () => {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  };
  console.log(`Conectado con la base de datos de mongodb`);
} catch (error) {
  console.log(`error al conectarse a la base de datos... --->${err}`);
} */
module.exports = mongoose;
