import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Layout/Footer";
import NavBar from "./components/Layout/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <ToastContainer
        pauseOnHover={false}
        outClose={3000}
        position="Bottom-right"
      />
      <Footer />
    </div>
  );
}

export default App;
