import SPA from "/assets/spa.jpg";
import SPA2 from "/assets/spa2.jpg";
import { Link } from "react-router-dom";

const HomeBodyMobile = () => {
  return (
    <div className="flex flex-col py-12 bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
      <div className="bg-white bg-opacity-90 shadow-2xl p-6 rounded-3xl w-full mx-auto flex flex-col items-center">
        <h2
          className="text-[#cb0c4f] text-center text-4xl font-bold mb-4 uppercase tracking-wide"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <b>Conoce más</b> de nosotros
        </h2>

        <p
          className="text-center text-[#333] text-lg mb-4 leading-relaxed px-5"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          En nuestro{" "}
          <b
            className="text-xl text-[#cb0c4f] font-semibold"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            spa
          </b>
          , ofrecemos una{" "}
          <b
            className="text-xl text-[#cb0c4f] font-semibold"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            variedad de tratamientos
          </b>{" "}
          diseñados para tu{" "}
          <b
            className="text-xl text-[#cb0c4f] font-semibold"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            bienestar
          </b>{" "}
          y{" "}
          <b
            className="text-xl text-[#cb0c4f] font-semibold"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            belleza
          </b>
          .
        </p>

        <p
          className="text-center text-[#333] text-lg mb-4 leading-relaxed px-5"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Disfruta de{" "}
          <b
            className="text-xl text-[#cb0c4f] font-semibold"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            masajes anti-estrés
          </b>
          ,{" "}
          <b
            className="text-xl text-[#cb0c4f] font-semibold"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            descontracturantes
          </b>
          , con{" "}
          <b
            className="text-xl text-[#cb0c4f] font-semibold"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            piedras calientes
          </b>{" "}
          y más, perfectos para{" "}
          <b
            className="text-xl text-[#cb0c4f] font-semibold"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            revitalizarte
          </b>
          .
        </p>

        {/* Contenedor flexible para imágenes */}
        <div className="flex justify-center mb-6 relative">
          <img
            src={SPA}
            alt="Banner Mobile"
            className="w-48 h-32 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
          <img
            src={SPA2}
            alt="Banner Mobile 2"
            className="w-48 h-32 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 ml-[-25px] mt-5" // Ajusta el margen para la superposición y añade margen superior
          />
        </div>

        {/* Botón de opiniones */}
        <Link
          to="/opiniones"
          className="bg-[#cb0c4f] text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-[#38AD26] mt-6"
        >
          Conoce las opiniones de nuestros{" "}
          <b className="font-semibold">clientes</b>
        </Link>
      </div>
    </div>
  );
};

export default HomeBodyMobile;
