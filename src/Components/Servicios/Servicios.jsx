import { useState } from "react";
import Calendar from "react-calendar";
import background from "/assets/background.jpg"; // Importa la imagen de fondo

const Servicios = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(""); // Estado para la hora seleccionada
  const [service, setService] = useState(""); // Estado para el servicio seleccionado

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar la reserva a tu backend
  };

  return (
    <section
      id="servicios"
      className="py-16"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        filter: "brightness(0.7)", // Oscurecer la imagen de fondo
      }}
    >
      <div className="container mx-auto text-center">
        <div className="backdrop-blur-lg bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Ofrecemos una variedad de servicios de spa, desde masajes relajantes
            hasta tratamientos de belleza.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
            {/* Masajes */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Masajes</h3>
              <ul className="list-disc list-inside text-left">
                <li>Anti-stress</li>
                <li>Descontracturantes</li>
                <li>Masajes con piedras calientes</li>
                <li>Circulatorios</li>
              </ul>
            </div>

            {/* Belleza */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Belleza</h3>
              <ul className="list-disc list-inside text-left">
                <li>Lifting de pestaña</li>
                <li>Depilación facial</li>
                <li>Belleza de manos y pies</li>
              </ul>
            </div>

            {/* Tratamientos Faciales */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Tratamientos Faciales
              </h3>
              <ul className="list-disc list-inside text-left">
                <li>Punta de Diamante: Microexfoliación</li>
                <li>Limpieza profunda + Hidratación</li>
                <li>
                  Crio frecuencia facial: produce el “SHOCK TERMICO” logrando
                  resultados instantáneos de efecto lifting
                </li>
              </ul>
            </div>

            {/* Tratamientos Corporales */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Tratamientos Corporales
              </h3>
              <ul className="list-disc list-inside text-left">
                <li>
                  VelaSlim: Reducción de la circunferencia corporal y la
                  celulitis
                </li>
                <li>
                  DermoHealth: moviliza los distintos tejidos de la piel y
                  estimula la microcirculación, generando un drenaje linfático
                </li>
                <li>
                  Criofrecuencia: produce un efecto de lifting instantáneo
                </li>
                <li>Ultracavitación: Técnica reductora</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-6">Reserva tu Cita</h3>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <label
                htmlFor="service"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Selecciona el Servicio:
              </label>
              <select
                id="service"
                value={service}
                onChange={handleServiceChange}
                className="form-select w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Selecciona un servicio</option>
                <option value="Masaje Anti-stress">Masaje Anti-stress</option>
                <option value="Lifting de pestaña">Lifting de pestaña</option>
                <option value="Punta de Diamante">Punta de Diamante</option>
                <option value="VelaSlim">VelaSlim</option>
                {/* Agrega más opciones según los servicios disponibles */}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="calendar"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Selecciona la Fecha:
              </label>
              <Calendar
                id="calendar"
                onChange={handleDateChange}
                value={date}
                className="mx-auto w-full max-w-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Selecciona la Hora:
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={handleTimeChange}
                className="form-input w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="bg-[#cb0c4f] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#d44d7c] transition duration-300"
            >
              Reservar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Servicios;
