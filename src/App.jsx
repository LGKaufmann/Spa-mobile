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
import { LoginPersonalApp } from "./Components/LoginApp/LoginPersonalApp";
import LandingAdmin from "./Components/Landing/LandingAdmin";
import LandingAdminApp from "./Components/LandingApp/LandingAdminApp";
import Opiniones from "./Components/Opiniones/Opiniones";
import { ProtectedAdminRoute, ProtectedAdminAppRoute, ProtectedProfessionalRoute, ProtectedSecretaryRoute } from "./Components/ProtectedRoutes/ProtectedRoutes";
import ListadoClientes from "./Components/Admin/ListadoClientes";
import ListadoClientesPorDia from "./Components/Admin/ListadoClientesPorDia";
import ListadoClientesPorProfesional from "./Components/Admin/ListadoClientesPorProfesional";
import LandingProfesionalApp from "./Components/LandingApp/LandingProfesionalApp";
import LandingSecretariaApp from "./Components/LandingApp/LandingSecretariaApp";
import RegistrarPagoApp from "./Components/LandingApp/RegistrarPagoApp";
import ReportFormApp from "./Components/LandingApp/ReportFormApp";
import ReportIngresosApp from "./Components/LandingApp/ReportIngresosApp";
import AplicacionWeb from "./Components/AplicacionWeb/AplicacionWeb";
import AppLogin from "./Components/LoginApp/AppLogin";
import RegistroApp from "./Components/RegistroApp/RegistroApp";
import LoginProfesionalesApp from "./Components/LoginApp/LoginProfesionalesApp";
import LoginSecretariaApp from "./Components/LoginApp/LoginSecretariaApp";
import LandingApp from "./Components/LandingApp/LandingApp";
import ServicesListApp from "./Components/LandingApp/ServicesListApp";


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
            <Route path="/loginPersonalApp" element={<LoginPersonalApp />} />
            <Route path="/loginPersonal" element={<LoginPersonal />} />
            <Route path="/loginProfesionalesApp" element={<LoginProfesionalesApp />} />
            <Route path="/loginSecretariaApp" element={<LoginSecretariaApp />} />
            <Route path="/aplicacion-web" element={<AplicacionWeb />} />
            <Route path="/app-login" element={<AppLogin />} />
            <Route path="/registroApp" element={<RegistroApp />} />
            <Route path="/home-app" element={<LandingApp />} />
            <Route path="/home" element={<Landing />} />
            <Route path="/empleo" element={<Empleo />} />
            <Route path="/pagos" element={<RegistrarPagoApp />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/opiniones" element={<Opiniones />} />

            {/* Rutas protegidas para admin */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <LandingAdmin />
                </ProtectedAdminRoute>
              }
            />
            
            {/* Rutas protegidas para admin app */}
            <Route
              path="/adminApp"
              element={
                <ProtectedAdminAppRoute>
                  <LandingAdminApp />
                </ProtectedAdminAppRoute>
              }
            />
             <Route
              path="/listadoClientes"
              element={             
                  <ListadoClientes />
              }
            />
            <Route
            path="/ServiciosApp"
            element={
        
                <ServicesListApp />
            }
          />
            <Route
              path="/homeProfesional"
              element={
                <ProtectedProfessionalRoute>
                  <LandingProfesionalApp />
                </ProtectedProfessionalRoute>
              }
            />
            <Route
              path="/informeServicios"
              element={
                  <ReportFormApp />
              }
            />
            <Route
              path="/informeIngresos"
              element={
           
                  <ReportIngresosApp />
              }
            />
            <Route
              path="/listadoClientesDia"
              element={
                    
                  <ListadoClientesPorDia />
               
              }
            />
            <Route
              path="/listadoClientesProfesional"
              element={
                  <ListadoClientesPorProfesional />
              }
            />
            <Route
              path="/homeSecretaria"
              element={
                <ProtectedSecretaryRoute>
                  <LandingSecretariaApp />
                </ProtectedSecretaryRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
