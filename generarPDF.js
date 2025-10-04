import PDFDocument from "pdfkit";
import fs from "fs";

export default function generarPDF(contrato, res) {
  const doc = new PDFDocument({ margin: 50 });

  // ✅ Encabezado con logo y empresa
  doc
    .image("logo.png", 50, 45, { width: 60 }) // <-- coloca un logo en tu carpeta raíz
    .fontSize(20)
    .text("COMPRAVENTA LOS PIJAOS", 120, 57)
    .moveDown();

  doc
    .fontSize(10)
    .fillColor("#666666")
    .text("Calle 16 No. 3-102 · Ibagué · Tel. 2611671", 120)
    .moveDown(2);

  // ✅ Línea divisoria
  doc
    .moveTo(50, 120)
    .lineTo(550, 120)
    .strokeColor("#cccccc")
    .lineWidth(1)
    .stroke();

  // ✅ Título
  doc
    .fontSize(14)
    .fillColor("#000000")
    .text(contrato.tipo, { align: "center" })
    .moveDown(1);

  // ✅ Información general
  doc
    .fontSize(11)
    .text(`Número de contrato: ${contrato.numero}`)
    .text(`Fecha: ${contrato.plazo.fecha_inicio}`)
    .text(`Duración: ${contrato.plazo.meses} meses`)
    .moveDown();

  // ✅ Datos del vendedor
  doc
    .fontSize(12)
    .fillColor("#004aad")
    .text("Datos del Vendedor", { underline: true })
    .fillColor("#000000")
    .fontSize(11)
    .text(`Nombre: ${contrato.vendedor.nombre}`)
    .text(`Cédula: ${contrato.vendedor.cedula}`)
    .text(`Ciudad: ${contrato.vendedor.ciudad}`)
    .text(`Dirección: ${contrato.vendedor.direccion}`)
    .text(`Celular: ${contrato.vendedor.celular}`)
    .moveDown();

  // ✅ Datos del comprador
  doc
    .fontSize(12)
    .fillColor("#004aad")
    .text("Datos del Comprador", { underline: true })
    .fillColor("#000000")
    .fontSize(11)
    .text(`Nombre: ${contrato.comprador.nombre}`)
    .text(`Cédula: ${contrato.comprador.cedula}`)
    .moveDown();

  // ✅ Artículo vendido
  doc
    .fontSize(12)
    .fillColor("#004aad")
    .text("Artículo en garantía", { underline: true })
    .fillColor("#000000")
    .fontSize(11)
    .text(`Descripción: ${contrato.articulo.descripcion}`)
    .text(`Peso: ${contrato.articulo.peso}`)
    .moveDown();

  // ✅ Valor y condiciones
  doc
    .fontSize(12)
    .fillColor("#004aad")
    .text("Valor del préstamo", { underline: true })
    .fillColor("#000000")
    .fontSize(11)
    .text(`Monto: $${contrato.prestamo.valor.toLocaleString("es-CO")}`)
    .text(`En letras: ${contrato.prestamo.valor_letras}`)
    .moveDown();

  // ✅ Cláusulas
  doc
    .fontSize(12)
    .fillColor("#004aad")
    .text("Cláusulas principales", { underline: true })
    .fillColor("#000000")
    .fontSize(10)
    .list([
      contrato.clausulas.primera,
      contrato.clausulas.segunda,
      contrato.clausulas.tercera.replace(/<[^>]+>/g, ""), // eliminar etiquetas HTML
    ])
    .moveDown();

  // ✅ Observaciones
  doc
    .fontSize(10)
    .fillColor("#333333")
    .text(`Observaciones: ${contrato.observaciones}`)
    .moveDown(3);

  // ✅ Firmas
  doc
    .fontSize(12)
    .fillColor("#000000")
    .text("___________________________", 80)
    .text("Vendedor", 110)
    .text("___________________________", 350, 680)
    .text("Comprador", 390)
    .moveDown(2);

  // ✅ Pie de página
  doc
    .fontSize(8)
    .fillColor("#999999")
    .text("Documento generado automáticamente por COMPRAVENTA LOS PIJAOS", 50, 760, {
      align: "center",
      width: 500,
    });

  // ✅ Enviar PDF como respuesta
  doc.pipe(res);
  doc.end();
}
