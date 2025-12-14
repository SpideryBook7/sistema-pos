import express from "express";
import { getDB } from "../database.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        const db = getDB();
        const rows = await db.all("SELECT * FROM productos");
        res.json({ data: rows });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Agregar un producto
router.post("/", async (req, res) => {
    const { nombre, precio, stock } = req.body;
    try {
        const db = getDB();
        const result = await db.run(
            "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
            [nombre, precio, stock]
        );
        res.json({ id: result.lastID });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Actualizar producto
router.put("/:id", async (req, res) => {
    const { nombre, precio, stock } = req.body;
    const { id } = req.params;
    try {
        const db = getDB();
        const result = await db.run(
            "UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?",
            [nombre, precio, stock, id]
        );
        res.json({ updated: result.changes });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const db = getDB();
        const result = await db.run("DELETE FROM productos WHERE id=?", [id]);
        res.json({ deleted: result.changes });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
