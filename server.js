const path = require("path");
const cors = require("cors");
const express = require("express");

const port = process.env.PORT || 9000;
const publicPath = path.join(__dirname, "public");
const morgan = require("morgan");

// INIT
const app = express();
const { mongoose } = require("./database");

//SETTINGS
app.set("port", port);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//PUBLIC
app.use(express.static(publicPath));

//ROUTES
const ItemRoutes = require("./routes/itemRoutes");
const userRouter = require("./routes/userRoutes");
app.use("/api/", ItemRoutes);
app.use("/api/", userRouter);
//SERVER START
app.listen(app.get("port"), () => {
  console.log(`Conectado con el servidor en el puerto -> ${app.get("port")}`);
});
