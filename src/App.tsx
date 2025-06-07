import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import "./index.css";
import AppRoutes from "./router";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <ToastContainer position="bottom-right" />
    </AppProvider>
  );
}

export default App;
