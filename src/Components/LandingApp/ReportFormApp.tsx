import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf"; // Import jsPDF
import background from "/assets/bgLanding.jpg";
import Logo from "../../../public/assets/logo.png";
import SidebarAdminApp from "../LandingApp/SidebarAdminApp";

interface IProfesional {
  _id: string;
  nombre: string;
  apellido: string;
}

const ReportFormApp: React.FC = () => {
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
    // Configuración y contenido de PDF...
  };

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div
      className="flex"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <SidebarAdminApp />
      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full mx-auto my-4 flex flex-col items-center">
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
            disabled={turnos.length === 0}
          >
            Descargar PDF
          </button>
          {sinTurnos && (
            <div className="mt-6">
              <p className="text-red-500 text-center">
                Este profesional no tiene turnos para el rango de fechas
                seleccionado.
              </p>
            </div>
          )}
          {turnos?.length > 0 && (
            <div className="mt-6 w-full">
              <h3 className="text-xl font-semibold text-black text-center">
                Resultados
              </h3>
              {turnos.map((turno) => (
                <div
                  key={turno._id}
                  className="mt-4 border p-4 rounded-md bg-gray-100"
                >
                  <p className="text-black">Servicio: {turno.servicio.nombre}</p>
                  <p className="text-black">
                    Cliente: {turno.usuario.nombre} {turno.usuario.apellido}
                  </p>
                  <p className="text-black">Fecha: {turno.fecha.split("T")[0]}</p>
                  <p className="text-black">Hora: {turno.hora}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportFormApp;
