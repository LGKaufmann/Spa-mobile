import { useState } from "react";
import { useDispatch } from "react-redux";
import { crearOpinion } from "../../redux/servicesAction";

const Footer = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleCommentChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      text: text,
    };
    dispatch(crearOpinion(body));
  };

  return (
    <footer className="bg-gradient-to-r from-[#E486A7] to-[#79B250] text-white py-8 relative">
      <div className="container mx-auto text-center flex flex-col items-center">
        <p className="text-lg mb-4">
          &copy; {new Date().getFullYear()} Spa Sentirse Bien. Todos los
          derechos reservados.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14162.33049440195!2d-58.9790106!3d-27.4511154!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450cf0c80be0d3%3A0xc9f9278c74810912!2sUTN%20-%20Facultad%20Regional%20Resistencia!5e0!3m2!1ses-419!2sar!4v1726505389689!5m2!1ses-419!2sar"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>

          <div className="w-full md:w-1/2 bg-white text-black rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4">
              ¡Queremos conocer tu opinión!
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                value={text}
                onChange={handleCommentChange}
                placeholder="Deja tu comentario..."
                className="w-full p-2 mb-4 border border-gray-300 bg-white rounded-lg"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#cb0c4f] text-white rounded-lg hover:bg-[#a00d40]"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
