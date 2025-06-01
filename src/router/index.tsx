import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home";
import AboutPage from "../pages/about";
import SignIn from "../pages/signin";
import useAppContext from "../hooks/useAppContext";
import SignUp from "../pages/signup";
import { useEffect } from "react";
import { NotFound } from "../pages/notfound";

const AppRoutes = () => {
  const { isAuth, setIsAuth } = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuth(true);
      console.log("User is authenticated");
    } else {
      setIsAuth(false);
      console.log("User is not authenticated");
    }
  }, [setIsAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout isAuth={isAuth} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        <Route
          path="/signin"
          element={isAuth ? <Navigate to="/home" replace /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={isAuth ? <Navigate to="/home" replace /> : <SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
