import express from "express";
import { getDB } from "../database.js";

const router = express.Router();

// Crear una venta
router.post("/", async (req, res) => {
    const { productos } = req.body; // [{id, cantidad}]
    const fecha = new Date().toISOString();

    // Calcular total
    let total = 0;
    productos.forEach(p => { total += p.precio * p.cantidad });

    try {
        const db = getDB();
        // Insertar venta
        const result = await db.run(
            "INSERT INTO ventas (fecha, total) VALUES (?, ?)",
            [fecha, total]
        );
        const ventaId = result.lastID;

        // Insertar detalle de venta y actualizar stock
        for (const p of productos) {
            await db.run(
                "INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)",
                [ventaId, p.id, p.cantidad, p.precio]
            );

            await db.run(
                "UPDATE productos SET stock = stock - ? WHERE id = ?",
                [p.cantidad, p.id]
            );
        }

        res.json({ ventaId, total });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obtener todas las ventas
router.get("/", async (req, res) => {
    try {
        const db = getDB();
        const rows = await db.all("SELECT * FROM ventas");
        res.json({ data: rows });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
