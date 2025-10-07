import fs from "fs";
import path from "path";
import pdf from "html-pdf-node";

export default async function generarPDF(contrato, res) {
  try {
    // Cargar plantilla HTML
    const htmlPath = path.resolve("plantilla.html");
    let html = fs.readFileSync(htmlPath, "utf8");

    // Reemplazar los {{campos}} en la plantilla
    const reemplazar = (obj, prefix = "") => {
      for (const key in obj) {
        const valor = obj[key];
        if (typeof valor === "object") {
          reemplazar(valor, `${prefix}${key}.`);
        } else {
          const regex = new RegExp(`{{${prefix}${key}}}`, "g");
          html = html.replace(regex, valor ?? "");
        }
      }
    };

    reemplazar(contrato);

    // Configurar opciones del PDF
    const options = {
      format: "A4",
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
      printBackground: true
    };

    const file = { content: html };
    const pdfBuffer = await pdf.generatePdf(file, options);

    // Enviar PDF como respuesta
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Contrato_${contrato.numero}.pdf`
    );
    res.send(pdfBuffer);
  } catch (err) {
    console.error("❌ Error generando PDF:", err);
    res.status(500).json({ error: "Error interno generando PDF" });
  }
}
