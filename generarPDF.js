// generarPDF.js
const PDFDocument = require("pdfkit");

function generarPDF(contrato, res) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(res);

  // Encabezado
  doc.fontSize(16).text(`CONTRATO N° ${contrato.numero}`, { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`${contrato.tipo}`, { align: "center" });
  doc.moveDown();

  // Empresa
  doc.fontSize(12).text(`Empresa: ${contrato.empresa.nombre} (NIT: ${contrato.empresa.nit})`);
  doc.text(`Dirección: ${contrato.empresa.direccion} - Tel: ${contrato.empresa.telefono}`);
  doc.text(`Ciudad: ${contrato.empresa.ciudad}`);
  doc.moveDown();

  // Vendedor
  doc.text(`Vendedor: ${contrato.vendedor.nombre} - CC ${contrato.vendedor.cedula}`);
  doc.text(`Ciudad: ${contrato.vendedor.ciudad} - Dirección: ${contrato.vendedor.direccion}`);
  doc.text(`Celular: ${contrato.vendedor.celular}`);
  doc.moveDown();

  // Comprador
  doc.text(`Comprador: ${contrato.comprador.nombre} - CC ${contrato.comprador.cedula}`);
  doc.moveDown();

  // Préstamo y Plazo
  doc.text(`Préstamo: ${contrato.prestamo.valor_letras} (${contrato.prestamo.valor})`);
  doc.text(`Plazo: ${contrato.plazo.meses} meses desde ${contrato.plazo.fecha_inicio}`);
  doc.moveDown();

  // Bien
  doc.text(`Bien: ${contrato.articulo.descripcion} (${contrato.articulo.peso})`);
  doc.moveDown();

  // Clausulas
  doc.fontSize(13).text("CLÁUSULAS:", { underline: true });
  Object.entries(contrato.clausulas || {}).forEach(([clave, valor]) => {
    doc.fontSize(12).text(`${clave.toUpperCase()}: ${valor}`);
    doc.moveDown(0.5);
  });

  // Observaciones
  doc.moveDown();
  doc.text(`OBSERVACIONES: ${contrato.observaciones}`);
  doc.moveDown(2);

  // Firmas
  doc.text("_____________________________", 100, doc.y);
  doc.text(`Vendedor: ${contrato.vendedor.nombre}`, 100, doc.y + 15);
  doc.text("_____________________________", 350, doc.y - 15);
  doc.text(`Comprador: ${contrato.comprador.nombre}`, 350, doc.y + 15);

  doc.end();
}

module.exports = generarPDF;
