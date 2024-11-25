import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const Opiniones = () => {
  const [opiniones, setOpiniones] = useState<any[]>([]);

  useEffect(() => {
    // Fetch opiniones from the backend
    const fetchOpiniones = async () => {
      try {
        const response = await axios.get("/servicios/opiniones");
        setOpiniones(response.data);
      } catch (error) {
        console.error("Error fetching opiniones:", error);
      }
    };

    fetchOpiniones();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-700 to-[#cb0c4f] py-8 px-4">
      <div className="container max-w-4xl bg-white shadow-lg rounded-lg p-8 mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          Opiniones
        </h1>
        <div className="space-y-6">
          {opiniones.length > 0 ? (
            opiniones.map((opinion, index) => (
              <div
                key={index}
                className="border border-gray-300 p-6 rounded-lg shadow-md bg-gray-50"
              >
                <p className="text-lg text-gray-700 mb-2">{opinion.text}</p>
                <p className="text-sm text-gray-500 text-right">
                  {format(new Date(opinion.date), "dd MMMM yyyy, HH:mm")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No hay opiniones disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Opiniones;
