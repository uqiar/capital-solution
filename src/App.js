import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routing />
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
