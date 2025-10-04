// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contratoSchema = require("./validate");
const generarPDF = require("./generarPDF");

const app = express();

// Middleware
app.use(cors()); // permite llamadas desde frontends externos
app.use(express.json({ limit: "2mb" })); // permite recibir JSON en el body

// Endpoint POST /generar-pdf
app.post("/generar-pdf", (req, res) => {
  const apiKey = req.header("x-api-key");
  if (process.env.API_KEY && apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized: API Key inválida" });
  }

  // Validar contrato con Joi
  const { error, value } = contratoSchema.validate(req.body.contrato, { abortEarly: false });

  if (error) {
    return res.status(400).json({ error: "JSON inválido", detalles: error.details });
  }

  try {
    const contrato = value;

    // Configuración de headers
    const filename = `Contrato_${contrato.numero}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Generar el PDF
    generarPDF(contrato, res);

  } catch (err) {
    console.error("Error al generar PDF:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Error interno generando PDF" });
    } else {
      res.end();
    }
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
