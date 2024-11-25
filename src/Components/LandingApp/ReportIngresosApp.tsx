import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import background from "/assets/bgLanding.jpg";
import Logo from "../../../public/assets/logo.png";
import SidebarAdminApp from "../LandingApp/SidebarAdminApp";

interface IIngreso {
  _id: string;
  metodoPago: string;
  cantidad: number;
  fechaPago: string;
  servicio: string;
}

const ReportIngresosApp: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [ingresos, setIngresos] = useState<IIngreso[]>([]);
  const [sinIngresos, setSinIngresos] = useState(false);
  const [tipoPago, setTipoPago] = useState<string>("");
  const [tiposPago] = useState<string[]>(["tarjetaDebito", "tarjetaCredito"]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIngresos([]);
    setSinIngresos(false);

    try {
      const response = await axios.get("/servicios/ingresos", {
        params: {
          metodoPago: tipoPago,
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

    const logoWidth = 40;
    const logoHeight = 40;
    const logoX = (doc.internal.pageSize.width - logoWidth) / 2;
    doc.addImage(Logo, "PNG", logoX, 10, logoWidth, logoHeight);

    doc.setFontSize(20);
    const title = "Informe de Ingresos";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleX, 55);

    const startDateText = `Fecha de Inicio: ${fechaInicio}`;
    const endDateText = `Fecha de Fin: ${fechaFin}`;
    doc.setFontSize(12);
    doc.text(startDateText, 10, 65);
    doc.text(endDateText, 10, 75);

    if (tipoPago) {
      const tipoPagoText = `Tipo de Pago: ${tipoPago}`;
      doc.text(tipoPagoText, 10, 85);
    }

    doc.setFontSize(14);
    doc.text("Ingresos:", 10, 95);
    doc.setFontSize(12);

    if (ingresos.length > 0) {
      let yOffset = 105;
      let totalMonto = 0;

      ingresos.forEach((ingreso) => {
        const { metodoPago, cantidad, fechaPago, servicio } = ingreso;
        const metodoPagoText = `Método de Pago: ${metodoPago}`;
        const cantidadText = `Monto: $${cantidad}`;
        const fechaText = `Fecha: ${fechaPago}`;
        const servicioText = `Servicio: ${servicio}`;

        const metodoPagoX = (doc.internal.pageSize.width - doc.getTextWidth(metodoPagoText)) / 2;
        const cantidadX = (doc.internal.pageSize.width - doc.getTextWidth(cantidadText)) / 2;
        const fechaX = (doc.internal.pageSize.width - doc.getTextWidth(fechaText)) / 2;
        const servicioX = (doc.internal.pageSize.width - doc.getTextWidth(servicioText)) / 2;

        doc.text(metodoPagoText, metodoPagoX, yOffset);
        doc.text(cantidadText, cantidadX, yOffset + 10);
        doc.text(fechaText, fechaX, yOffset + 20);
        doc.text(servicioText, servicioX, yOffset + 30);

        doc.setDrawColor(200);
        doc.line(20, yOffset + 35, 190, yOffset + 35);

        yOffset += 50;
        totalMonto += cantidad;
      });

      doc.setFontSize(14);
      doc.text(`Total de Ingresos: $${totalMonto}`, 10, yOffset);
    } else {
      doc.text("No hay ingresos para el rango de fechas seleccionado.", 10, 120);
    }

    doc.save("informe_ingresos.pdf");
  };

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="flex">
      <SidebarAdminApp />

      <div
        className="flex flex-col items-center justify-center min-h-screen w-full"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
      >
        <div className="p-6 bg-white/90 rounded-lg shadow-lg max-w-lg mx-auto my-4 w-full">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Generar Informe de Ingresos
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Selecciona un Método de Pago:
              </label>
              <select
                value={tipoPago}
                onChange={(e) => setTipoPago(e.target.value)}
                className="mt-2 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700"
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
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Fecha de Inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Fecha de Fin
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md w-full mt-4"
            >
              Obtener Informe
            </button>
          </form>
          {sinIngresos && (
            <p className="mt-4 text-red-600 text-center">
              No se encontraron ingresos para este rango.
            </p>
          )}
          {ingresos.length > 0 && (
            <button
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-6 w-full"
            >
              Descargar PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportIngresosApp;
