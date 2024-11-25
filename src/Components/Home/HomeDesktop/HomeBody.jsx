import { Link } from "react-router-dom";
import SPA from "/assets/spa.jpg";
import SPA2 from "/assets/spa2.jpg";

export const HomeBody = () => {
  return (
    <div className="flex flex-col py-12 bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
      <div className="bg-white bg-opacity-90 shadow-2xl p-6 rounded-3xl w-full mx-auto flex flex-col lg:flex-row items-center">
        <div className="relative w-full lg:w-[40%] mb-8 lg:mb-0 lg:mr-12">
          <div className="flex flex-col items-center relative">
            <img
              src={SPA}
              alt="Banner Spa"
              className="w-[90%] h-[300px] object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-6"
            />
            <img
              src={SPA2}
              alt="Banner Spa 2"
              className="w-[85%] h-[250px] object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 mt-[-50px]"
            />
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start lg:max-w-[60%]">
          <div className="bg-[#ffffff] bg-opacity-90 border-2 border-[#ffb3c1] shadow-md p-8 rounded-lg w-full">
            {" "}
            {/* Aumenté el padding a p-8 */}
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
            <p
              className="text-center text-[#333] text-lg mb-4 leading-relaxed px-5"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              ¡Ven a{" "}
              <b
                className="text-xl text-[#cb0c4f] font-semibold"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                vivir una experiencia
              </b>{" "}
              de{" "}
              <b
                className="text-xl text-[#cb0c4f] font-semibold"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                bienestar
              </b>{" "}
              hecha a tu medida!
            </p>
            <p
              className="text-center text-[#333] font-light text-2xl mb-8 leading-relaxed px-5"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <b className="font-normal text-[#cb0c4f]">Únete a nosotros</b> en
              este viaje hacia{" "}
              <b className="font-normal text-[#cb0c4f]">
                un futuro más saludable y eficiente
              </b>
              .
            </p>
            <div className="text-center mt-6">
              <Link
                to="/opiniones"
                className="bg-[#cb0c4f] text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-[#38AD26]"
              >
                Conoce las opiniones de nuestros{" "}
                <b className="font-semibold">clientes</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
