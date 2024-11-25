const QuienesSomos = () => {
  return (
    <section
      id="quienes-somos"
      className="relative py-16 min-h-screen overflow-hidden" // Asegúrate de que el overflow esté aquí
    >
      {/* Fondo desenfocado */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/bgLanding.jpg')`, // Cambia la URL por la imagen que desees utilizar
          filter: "blur(3px)", // Aplica un efecto de desenfoque al fondo
          zIndex: 1, // Coloca este div detrás del contenido
          width: "100%", // Asegura que cubra todo el ancho de la ventana
          height: "100%", // Asegura que cubra todo el alto de la ventana
          backgroundSize: "cover", // Asegura que la imagen cubra el área
        }}
      ></div>
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
      {/* Contenido principal */}
      <div className="relative container mx-auto text-center z-20">
        <h2
          className="text-5xl font-bold mb-6 text-[#cb0c4f]"
          style={{
            fontFamily: "Playball, cursive",
            color: "#cb0c4f",
          }}
        >
          ¿Quiénes Somos?
        </h2>
        <p
          className="text-2xl text-[#cb0c4f] mb-8"
          style={{
            fontFamily: "Playball, cursive",
            color: "#cb0c4f",
          }}
        >
          En nuestro spa, nos dedicamos a ofrecer bienestar y relajación a
          través de tratamientos personalizados y un equipo de profesionales
          altamente capacitados.
        </p>

        <div
          className="flex flex-col lg:flex-row justify-center items-center gap-8"
          style={{ fontFamily: "Lato, sans-serif", color: "#cb0c4f" }}
        >
          {/* Primer contenedor */}
          <div className="lg:w-1/4 bg-white bg-opacity-30 border-2 border-[#cb0c4f] backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <img
              src="/assets/Spaequipo.jpg"
              alt="Nuestro Equipo"
              className="w-full h-48 object-cover mb-4 rounded-t-lg"
            />
            <h3 className="text-2xl font-semibold text-[#cb0c4f] mb-2">
              Nuestro Equipo
            </h3>
            <p className="text-gray-600 mb-4">
              Contamos con un equipo de expertos en bienestar y relajación,
              comprometidos con tu salud y confort.
            </p>
          </div>

          {/* Segundo contenedor */}
          <div className="lg:w-1/4 bg-white bg-opacity-30 border-2 border-[#cb0c4f] backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <img
              src="/assets/Spaservicios.jpg"
              alt="Nuestros Servicios"
              className="w-full h-48 object-cover mb-4 rounded-t-lg"
            />
            <h3 className="text-2xl text-[#cb0c4f] font-semibold mb-2">
              Nuestros Servicios
            </h3>
            <p className="text-gray-600 mb-4">
              Ofrecemos una variedad de tratamientos diseñados para satisfacer
              tus necesidades de bienestar.
            </p>
          </div>

          {/* Tercer contenedor */}
          <div className="lg:w-1/4 border-2 border-[#cb0c4f] backdrop-blur-lg bg-white bg-opacity-30 rounded-lg p-8 hover:shadow-2xl transition-transform transform hover:scale-105 shadow-lg">
            <img
              src="/assets/Spamision.jpg"
              alt="Nuestra Misión"
              className="w-full h-48 object-cover mb-4 rounded-t-lg"
            />
            <h3 className="text-2xl text-[#cb0c4f] font-semibold mb-2">
              Nuestra Misión
            </h3>
            <p className="text-gray-600 mb-4">
              Nuestra misión es proporcionar un ambiente de tranquilidad y
              rejuvenecimiento para todos nuestros clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;
