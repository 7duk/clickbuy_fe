import "./App.css";
import { AppProvider } from "./context/AppContext";
import "./index.css";
import AppRoutes from "./router";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
