import express from "express";
import cors from "cors";
import { initDB } from "./database.js";
import { UserModel } from "./models/userModel.js";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3001;
const SECRET = "mi_secreto_super_seguro"; // ⚠️ Cambia esto en producción

app.use(cors());
app.use(express.json());

let db, userModel;

// Routes imports
import productsRoutes from "./routes/products.js";
import salesRoutes from "./routes/sales.js";
import reportsRoutes from "./routes/reports.js";
import ticketsRoutes from "./routes/tickets.js";

// Inicializar base de datos y modelo de usuarios
(async () => {
  db = await initDB();
  userModel = new UserModel(db);
})();

// Use Routes
app.use("/productos", productsRoutes);
app.use("/ventas", salesRoutes);
app.use("/reportes", reportsRoutes);
app.use("/tickets", ticketsRoutes);

// ===== RUTAS =====

// Registro de usuario
app.post("/api/auth/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await userModel.createUser(username, password, role);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findByUsername(username);

  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const valid = await userModel.validatePassword(user, password);
  if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token });
});

// Ruta protegida de ejemplo
app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, SECRET);
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
});

// Listar usuarios (Solo admin debería, pero simplificado)
app.get("/api/users", async (req, res) => {
  try {
    const users = await db.all("SELECT id, username, role, created_at FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar usuario
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.run("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
