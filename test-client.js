import fs from "fs";
import fetch from "node-fetch";

// 1️⃣ URL del servicio (ajusta con tu URL pública real de Railway)
const URL = "https://contrato-pdf-production.up.railway.app/generar-pdf"; // <-- reemplázala si tu URL es distinta

// 2️⃣ Cargar tu JSON de ejemplo desde el archivo local
const rawData = fs.readFileSync("./sample.json", "utf-8");
const data = JSON.parse(rawData); // Convierte el JSON en objeto JS

// 3️⃣ Hacer la petición POST al endpoint /generar-pdf
console.log("⏳ Enviando JSON al servidor para generar el PDF...");

const response = await fetch(URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "supersecreta123" // usa la misma API_KEY que tienes en Railway
  },
  body: JSON.stringify(data) // envía el contenido de sample.json
});

// 4️⃣ Verificar si la respuesta es exitosa
if (!response.ok) {
  console.error("❌ Error en la respuesta del servidor:", response.statusText);
  const errorData = await response.json().catch(() => null);
  console.error(errorData || "Respuesta no válida");
  process.exit(1);
}

// 5️⃣ Guardar el PDF generado en un archivo local
const buffer = await response.arrayBuffer();
const filename = `Contrato_${data.contrato.numero}.pdf`;
fs.writeFileSync(filename, Buffer.from(buffer));

console.log(`✅ PDF generado correctamente: ${filename}`);
console.log(`🔗 Fuente: ${URL}`);
