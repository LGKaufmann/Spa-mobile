import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Navbar/Header";
import Registro from "./Components/Registro/Registro";
import Login from "./Components/Login/Login";
import { Landing } from "./Components/Landing/Landing";
import Empleo from "./Components/Empleo/Empleo";
import Noticias from "./Components/Noticias/Noticias";
import QuienesSomos from "./Components/QuienesSomos/QuienesSomos";
import Servicios from "./Components/Servicios/Servicios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "./redux/userAction";
import { LoginPersonal } from "./Components/Login/LoginPersonal";
import LandingAdmin from "./Components/Landing/LandingAdmin";
import Opiniones from "./Components/Opiniones/Opiniones";
import {
  ProtectedAdminRoute,
  ProtectedProfessionalRoute,
  ProtectedSecretaryRoute,
} from "./Components/ProtectedRoutes/ProtectedRoutes";
import ListadoClientes from "./Components/Admin/ListadoClientes";
import ListadoClientesPorDia from "./Components/Admin/ListadoClientesPorDia";
import ListadoClientesPorProfesional from "./Components/Admin/ListadoClientesPorProfesional";
import LoginProfesionales from "./Components/Login/LoginProfesionales";
import LoginSecretaria from "./Components/Login/LoginSecretaria";
import LandingProfesional from "./Components/Landing/LandingProfesional";
import LandingSecretaria from "./Components/Landing/LandingSecretaria";
import RegistrarPago from "./Components/Landing/RegistrarPago";
import ReportForm from "./Components/Landing/ReportForm";
import ReportIngresos from "./Components/Landing/ReportIngresos";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch, token]);

  return (
    <Router>
      <div className="flex flex-col bg-slate-100 w-screen">
        <div className="flex-grow">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginPersonal" element={<LoginPersonal />} />
            <Route path="/loginProfesional" element={<LoginProfesionales />} />
            <Route path="/loginSecretaria" element={<LoginSecretaria />} />
            <Route path="/home" element={<Landing />} />
            <Route path="/listadoClientes" element={<ListadoClientes />} />
            <Route
              path="/listadoClientesDia"
              element={<ListadoClientesPorDia />}
            />
            <Route
              path="/listadoClientesProfesional"
              element={<ListadoClientesPorProfesional />}
            />
            <Route path="/informeServicios" element={<ReportForm />} />
            <Route path="/informeIngresos" element={<ReportIngresos />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <LandingAdmin />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/homeProfesional"
              element={
                <ProtectedProfessionalRoute>
                  <LandingProfesional />
                </ProtectedProfessionalRoute>
              }
            />
            <Route
              path="/homeSecretaria"
              element={
                <ProtectedSecretaryRoute>
                  <LandingSecretaria />
                </ProtectedSecretaryRoute>
              }
            />
            <Route path="/empleo" element={<Empleo />} />
            <Route path="/pagos" element={<RegistrarPago />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/opiniones" element={<Opiniones />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
