import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { crearTurno } from "../../redux/servicesAction"; // Asegúrate de importar la acción para crear un turno
import { obtenerProfesionales } from "../../redux/userAction";
import { Navigate, useNavigate } from "react-router-dom";

interface ICard {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
}

const CardLandingApp: React.FC<ICard> = ({
  id,
  nombre,
  descripcion,
  precio,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profesionales } = useSelector((state: any) => state.users); // Obtener la lista de profesionales del estado
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [selectedProfesional, setSelectedProfesional] = useState(""); // Nuevo estado para el profesional seleccionado
  const [isFormVisible, setIsFormVisible] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch<any>(obtenerProfesionales()); // Cargar la lista de profesionales cuando el componente se monta
  }, [dispatch]);

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  const handleTimeChange = (e: any) => {
    setTime(e.target.value);
  };

  const handleProfesionalChange = (e: any) => {
    setSelectedProfesional(e.target.value); // Cambiar el profesional seleccionado
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convertir la fecha a un formato plano YYYY-MM-DD
    const fechaPlano = date.toISOString().split("T")[0]; // Esto extrae solo la parte de la fecha

    const turnoData = {
      servicioId: id,
      fecha: fechaPlano, // Enviar solo la fecha en formato plano
      time: time,
      profesionalId: selectedProfesional, // Aquí se envía el ID del profesional
    };
    console.log(turnoData); // Para depuración

    // Llama a la acción para crear el turno
    await dispatch<any>(crearTurno(turnoData, token as string));
    navigate("/pagos", {
      state: {
        precio, // Precio del servicio
        servicio: {
          id: id, // Id del servicio
          nombre: nombre, // Nombre del servicio
        },
      },
    });
    setIsFormVisible(false);
    setSelectedProfesional(""); // Resetear la selección del profesional
  };

  const handleReserve = () => {
    setIsFormVisible(true);
  };

  return (
    <div
      id={id}
      className="border-2 border-[#cb0c4f] backdrop-blur-lg bg-white bg-opacity-30 rounded-lg p-8 hover:shadow-2xl transition-transform transform hover:scale-105 shadow-lg"
    >
      <h2
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: "Lato, sans-serif", color: "#cb0c4f" }}
      >
        {nombre}
      </h2>
      <p
        className="text-gray-600 mb-6 leading-relaxed"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        {descripcion}
      </p>
      <p
        className="text-gray-600 mb-6 leading-relaxed text-xl"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        Precio: ${precio}
      </p>
      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="calendar"
              className="block text-lg font-medium text-gray-700 mb-2"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Selecciona la Fecha:
            </label>
            <Calendar
              onChange={handleDateChange}
              value={date}
              className="custom-calendar w-full max-w-md mx-auto"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-lg font-medium text-gray-700 mb-2"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Selecciona la Hora:
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={handleTimeChange}
              className="form-input w-full p-2 border bg-white text-black border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="profesional"
              className="block text-lg font-medium text-gray-700 mb-2"
              style={{ fontFamily: "Lato, sans-serif" }}
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
              {profesionales.map((profesional: any) => (
                <option key={profesional._id} value={profesional._id}>
                  {profesional.nombre} {profesional.apellido}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center items-center gap-x-2">
            <button
              type="submit"
              className="bg-[#cb0c4f] text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Guardar cambios
            </button>
            <button
              onClick={() => setIsFormVisible(false)}
              className="bg-[#cb0c4f] text-white h-full px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
      {!isFormVisible && (
        <button
          onClick={handleReserve}
          className="bg-[#cb0c4f] text-white py-3 px-6 rounded-full hover:bg-green-700 transition-colors font-semibold text-lg shadow-md"
        >
          Reservar
        </button>
      )}
    </div>
  );
};

export default CardLandingApp;
