const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productosRouter = require("./routes/productos");
const ventasRouter = require("./routes/ventas");
const ticketsRouter = require("./routes/tickets");
const reportesRouter = require("./routes/reportes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/productos", productosRouter);
app.use("/ventas", ventasRouter);
app.use("/tickets", ticketsRouter);
app.use("/reportes", reportesRouter);


app.get("/", (req, res) => res.send("Servidor POS funcionando ✅"));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
