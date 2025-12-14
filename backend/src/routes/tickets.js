import express from "express";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDB } from "../database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Generar ticket de venta
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const db = getDB();
        const venta = await db.get("SELECT * FROM ventas WHERE id=?", [id]);

        if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

        const detalles = await db.all(
            "SELECT dv.cantidad, dv.precio, p.nombre FROM detalle_ventas dv JOIN productos p ON dv.producto_id=p.id WHERE dv.venta_id=?",
            [id]
        );

        const doc = new PDFDocument();
        const ticketsDir = path.join(__dirname, "../../tickets");
        if (!fs.existsSync(ticketsDir)) {
            fs.mkdirSync(ticketsDir, { recursive: true });
        }

        const filePath = path.join(ticketsDir, `venta_${id}.pdf`);
        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(20).text("Ticket de Venta", { align: "center" });
        doc.moveDown();
        doc.text(`ID Venta: ${venta.id}`);
        doc.text(`Fecha: ${venta.fecha}`);
        doc.moveDown();
        detalles.forEach(d => {
            doc.text(`${d.nombre} x ${d.cantidad} = $${d.precio * d.cantidad}`);
        });
        doc.moveDown();
        doc.text(`Total: $${venta.total}`, { align: "right" });

        doc.end();

        // Wait for file to be written before download
        doc.on('finish', () => {
            res.download(filePath, `venta_${id}.pdf`);
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
