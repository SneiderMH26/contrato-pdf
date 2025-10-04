import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contratoSchema from "./validate.js";
import generarPDF from "./generarPDF.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.post("/generar-pdf", (req, res) => {
  const apiKey = req.header("x-api-key");
  if (process.env.API_KEY && apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized: API Key inválida" });
  }

  const { error, value } = contratoSchema.validate(req.body.contrato, { abortEarly: false });

  if (error) {
    return res.status(400).json({ error: "JSON inválido", detalles: error.details });
  }

  try {
    const contrato = value;
    const filename = `Contrato_${contrato.numero}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    generarPDF(contrato, res);
  } catch (err) {
    console.error("🛑 ERROR AL GENERAR PDF 🛑");
    console.error(err.message);
    console.error(err.stack);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    } else {
      res.end();
    }
  }
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API de generación de PDF en funcionamiento");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("Señal SIGTERM recibida, apagando servidor...");
  process.exit(0);
});
