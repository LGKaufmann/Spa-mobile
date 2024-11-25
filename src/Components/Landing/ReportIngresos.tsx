import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import background from "/assets/bgLanding.jpg";
import Logo from "../../../public/assets/logo.png";

interface IIngreso {
  _id: string;
  metodoPago: string; // Cambiar a metodoPago
  cantidad: number;
  fechaPago: string;
  servicio: string;
}

const ReportIngresos: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [ingresos, setIngresos] = useState<IIngreso[]>([]);
  const [sinIngresos, setSinIngresos] = useState(false);
  const [tipoPago, setTipoPago] = useState<string>("");
  const [tiposPago] = useState<string[]>([
    "tarjetaDebito",
    "tarjetaCredito",
    "efectivo",
  ]); // Lista de métodos de pago
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIngresos([]);
    setSinIngresos(false);
    console.log(tipoPago);

    try {
      const response = await axios.get("/servicios/ingresos", {
        params: {
          metodoPago: tipoPago, // Cambiar a metodoPago
          fechaInicio,
          fechaFin,
        },
      });
      setIngresos(response.data);
      if (response.data.length === 0) {
        setSinIngresos(true);
      }
    } catch (error: any) {
      setSinIngresos(true);
      console.error("Error al obtener el informe:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Añadir Logo
    const logoWidth = 40; // Ajusta el ancho del logo
    const logoHeight = 40; // Ajusta la altura del logo
    const logoX = (doc.internal.pageSize.width - logoWidth) / 2; // Centrar el logo
    doc.addImage(Logo, "PNG", logoX, 10, logoWidth, logoHeight);

    // Título
    doc.setFontSize(20);
    const title = "Informe de Ingresos";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleX, 55);

    // Fechas
    const startDateText = `Fecha de Inicio: ${fechaInicio}`;
    const endDateText = `Fecha de Fin: ${fechaFin}`;
    doc.setFontSize(12);
    doc.text(startDateText, 10, 65);
    doc.text(endDateText, 10, 75);

    // Tipo de Pago
    if (tipoPago) {
      const tipoPagoText = `Tipo de Pago: ${tipoPago}`;
      doc.text(tipoPagoText, 10, 85);
    }

    // Añadir Título de Ingresos
    doc.setFontSize(14);
    doc.text("Ingresos:", 10, 95);
    doc.setFontSize(12);

    if (ingresos.length > 0) {
      let yOffset = 105; // Inicializa el yOffset a una posición mayor
      let totalMonto = 0; // Variable para almacenar el monto total

      ingresos.forEach((ingreso) => {
        const { metodoPago, cantidad, fechaPago, servicio } = ingreso; // Asegúrate de que 'servicio' está presente en el ingreso

        // Centrar el texto
        const metodoPagoText = `Método de Pago: ${metodoPago}`;
        const cantidadText = `Monto: $${cantidad}`;
        const fechaText = `Fecha: ${fechaPago}`;
        const servicioText = `Servicio: ${servicio}`; // Asegúrate de que 'servicio' está presente en el ingreso

        // Calcular el centro de cada texto
        const metodoPagoX =
          (doc.internal.pageSize.width - doc.getTextWidth(metodoPagoText)) / 2;
        const cantidadX =
          (doc.internal.pageSize.width - doc.getTextWidth(cantidadText)) / 2;
        const fechaX =
          (doc.internal.pageSize.width - doc.getTextWidth(fechaText)) / 2;
        const servicioX =
          (doc.internal.pageSize.width - doc.getTextWidth(servicioText)) / 2;

        doc.text(metodoPagoText, metodoPagoX, yOffset);
        doc.text(cantidadText, cantidadX, yOffset + 10);
        doc.text(fechaText, fechaX, yOffset + 20);
        doc.text(servicioText, servicioX, yOffset + 30); // Añade el servicio al PDF

        // Añadir línea divisoria
        doc.setDrawColor(200);
        doc.line(20, yOffset + 35, 190, yOffset + 35);

        // Incrementar el yOffset para el siguiente ingreso
        yOffset += 50; // Incrementa más espacio por la nueva línea del servicio

        // Sumar el monto al total
        totalMonto += cantidad;
      });

      // Mostrar el monto total
      doc.setFontSize(14);
      doc.text(`Total de Ingresos: $${totalMonto}`, 10, yOffset);
    } else {
      doc.text(
        "No hay ingresos para el rango de fechas seleccionado.",
        10,
        120
      );
    }

    // Guardar el PDF
    doc.save("informe_ingresos.pdf");
  };

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div
      className="flex flex-col items-center gap-y-8 justify-center min-h-screen"
      style={{
        backgroundImage: `url(${background})`,
        zIndex: 1,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto my-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Generar Informe de Ingresos
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Selecciona un Método de Pago:
            </label>
            <select
              value={tipoPago}
              onChange={(e) => setTipoPago(e.target.value)}
              className="form-select w-full p-2 border bg-white text-black border-gray-300 rounded-lg"
              required
            >
              <option value="" disabled>
                Selecciona un método de pago
              </option>
              {tiposPago.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Inicio
            </label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Fin
            </label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white p-2 rounded-md w-full mt-4"
          >
            Obtener Informe
          </button>
        </form>
        {sinIngresos && (
          <p className="mt-4 text-red-500">
            No se encontraron ingresos para este rango.
          </p>
        )}
        {ingresos.length > 0 && (
          <button
            onClick={generatePDF}
            className="bg-blue-500 text-white p-2 rounded-md mt-4"
          >
            Descargar PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportIngresos;
