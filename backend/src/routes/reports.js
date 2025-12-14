import express from "express";
import { getDB } from "../database.js";

const router = express.Router();

// Ventas por día
router.get("/ventas-dia/:fecha", async (req, res) => {
    const { fecha } = req.params; // formato YYYY-MM-DD
    try {
        const db = getDB();
        const rows = await db.all("SELECT * FROM ventas WHERE date(fecha) = date(?)", [fecha]);
        res.json({ data: rows });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ventas por mes
router.get("/ventas-mes/:anio/:mes", async (req, res) => {
    const { anio, mes } = req.params;
    try {
        const db = getDB();
        const rows = await db.all("SELECT * FROM ventas WHERE strftime('%Y', fecha)=? AND strftime('%m', fecha)=?", [anio, mes.padStart(2, "0")]);
        res.json({ data: rows });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
