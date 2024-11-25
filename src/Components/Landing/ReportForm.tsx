import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf"; // Import jsPDF
import background from "/assets/bgLanding.jpg";
import Logo from "../../../public/assets/logo.png";

interface IProfesional {
  _id: string;
  nombre: string;
  apellido: string;
}

const ReportForm: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [turnos, setTurnos] = useState<any[]>([]);
  const [sinTurnos, setSinTurnos] = useState(false);
  const [selectedProfesional, setSelectedProfesional] = useState("");
  const [profesionales, setProfesionales] = useState<IProfesional[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const response = await axios.get("/usuarios/profesionales");
        setProfesionales(response.data);
      } catch (error) {
        setError("Hubo un error al cargar los profesionales.");
      }
    };

    fetchProfesionales();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTurnos([]);
    setSinTurnos(false);
    try {
      const response = await axios.get("/servicios/turnosProfesional", {
        params: {
          profesionalId: selectedProfesional,
          fechaInicio,
          fechaFin,
        },
      });
      setTurnos(response.data);
    } catch (error: any) {
      if (error.response?.data?.message?.length > 0) {
        setSinTurnos(true);
      } else {
        setSinTurnos(false);
      }
      console.error("Error al obtener el informe:", error);
    }
  };

  const handleProfesionalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfesional(e.target.value);
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
    const title = "Informe de Servicios";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleX, 55);

    // Información del Profesional
    if (selectedProfesional) {
      const profesional = profesionales.find(
        (p) => p._id === selectedProfesional
      );
      if (profesional) {
        doc.setFontSize(12);
        const professionalInfo = `Profesional: ${profesional.nombre} ${profesional.apellido}`;
        const infoWidth = doc.getTextWidth(professionalInfo);
        const infoX = (doc.internal.pageSize.width - infoWidth) / 2;
        doc.text(professionalInfo, infoX, 70);
      }
    }

    // Fechas
    const startDateText = `Fecha de Inicio: ${fechaInicio}`;
    const startDateWidth = doc.getTextWidth(startDateText);
    const startDateX = (doc.internal.pageSize.width - startDateWidth) / 2;
    doc.text(startDateText, startDateX, 85);

    const endDateText = `Fecha de Fin: ${fechaFin}`;
    const endDateWidth = doc.getTextWidth(endDateText);
    const endDateX = (doc.internal.pageSize.width - endDateWidth) / 2;
    doc.text(endDateText, endDateX, 105);

    // Añadir Título de Turnos
    doc.setFontSize(14);
    const turnosTitle = "Turnos:";
    const turnosTitleWidth = doc.getTextWidth(turnosTitle);
    const turnosTitleX = (doc.internal.pageSize.width - turnosTitleWidth) / 2;
    doc.text(turnosTitle, turnosTitleX, 115);
    doc.setFontSize(12); // Cambiar tamaño de fuente para los turnos

    if (turnos.length > 0) {
      let yOffset = 125; // Inicializa el yOffset a una posición mayor
      turnos.forEach((turno, index) => {
        const { servicio, usuario, fecha, hora } = turno;

        // Añadir Servicio
        const serviceText = `Servicio: ${servicio.nombre}`;
        const serviceWidth = doc.getTextWidth(serviceText);
        const serviceX = (doc.internal.pageSize.width - serviceWidth) / 2;
        doc.text(serviceText, serviceX, yOffset);

        // Añadir Cliente
        const clientText = `Cliente: ${usuario.nombre} ${usuario.apellido}`;
        const clientWidth = doc.getTextWidth(clientText);
        const clientX = (doc.internal.pageSize.width - clientWidth) / 2;
        doc.text(clientText, clientX, yOffset + 10);

        // Añadir Fecha
        const dateText = `Fecha: ${fecha.split("T")[0]}`;
        const dateWidth = doc.getTextWidth(dateText);
        const dateX = (doc.internal.pageSize.width - dateWidth) / 2;
        doc.text(dateText, dateX, yOffset + 20);

        // Añadir Hora
        const timeText = `Hora: ${hora}`;
        const timeWidth = doc.getTextWidth(timeText);
        const timeX = (doc.internal.pageSize.width - timeWidth) / 2;
        doc.text(timeText, timeX, yOffset + 30);

        // Añadir línea divisoria para mejor separación
        doc.setDrawColor(200);
        doc.line(20, yOffset + 35, 190, yOffset + 35); // Línea divisoria

        // Incrementar el yOffset para el siguiente turno (ajusta la separación aquí)
        yOffset += 45; // Espaciado adicional entre turnos
      });
    } else {
      const noTurnosText =
        "No hay turnos para el rango de fechas seleccionado.";
      const noTurnosWidth = doc.getTextWidth(noTurnosText);
      const noTurnosX = (doc.internal.pageSize.width - noTurnosWidth) / 2;
      doc.text(noTurnosText, noTurnosX, 120);
    }

    // Guardar el PDF
    doc.save("informe_servicios.pdf");
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
          Generar Informe de Servicios
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label
              htmlFor="profesional"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Selecciona un Profesional:
            </label>
            <select
              id="profesional"
              value={selectedProfesional}
              onChange={handleProfesionalChange}
              className="form-select w-full p-2 border bg-white text-black border-gray-300 rounded-lg"
              required
            >
              <option value="" disabled>
                Selecciona un profesional
              </option>
              {profesionales.map((profesional) => (
                <option key={profesional._id} value={profesional._id}>
                  {profesional.nombre} {profesional.apellido}
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
        <button
          onClick={generatePDF}
          className="bg-red-500 text-white p-2 rounded-md w-full mt-4"
          disabled={turnos.length === 0} // Disable if there are no turnos
        >
          Descargar PDF
        </button>
        {sinTurnos && (
          <div className="mt-6">
            <p className="text-red-500">
              Este profesional no tiene turnos para el rango de fechas
              seleccionado.
            </p>
          </div>
        )}
        {turnos?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-black">Resultados</h3>
            {turnos.map((turno) => (
              <div key={turno._id} className="mt-4 border p-4 rounded-md">
                <p className="text-black">Servicio: {turno.servicio.nombre}</p>
                <p className="text-black">
                  Cliente: {turno.usuario.nombre} {turno.usuario.apellido}
                </p>
                <p className="text-black">
                  {" "}
                  Fecha: {turno.fecha.split("T")[0]} {/* Solo la fecha */}
                </p>
                <p className="text-black">Hora: {turno.hora}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportForm;
