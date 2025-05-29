import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home";
import AboutPage from "../pages/about";
import SignIn from "../pages/signin";
import useAppContext from "../hooks/useAppContext";

const AppRoutes = () => {
  const { isAuth, isLogin } = useAppContext();
  return (
    <BrowserRouter>
      <MainLayout isAuth={isAuth} isLogin={isLogin}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
