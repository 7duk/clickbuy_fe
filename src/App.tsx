import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import "./index.css";
import AppRoutes from "./router";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
