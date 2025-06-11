import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home";
import ContactPage from "../pages/contact";
import SignIn from "../pages/signin";
import useAppContext from "../hooks/useAppContext";
import SignUp from "../pages/signup";
import { useEffect } from "react";
import { NotFound } from "../pages/notfound";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoPage from "../pages/info";
import ProductPage from "../pages/product";
import ProductDetailPage from "../pages/product/detail";

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
      <div className="h-screen bg-white relative flex flex-col overflow-hidden">
        <Header />
        <Routes>
          {/* Routes for authenticated users */}
          <Route
            element={
              !isAuth ? <Navigate to="/signin" replace /> : <MainLayout />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/info/:id" element={<InfoPage />} />
            <Route path="/cart" element={<div>Cart</div>} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Authentication routes */}
          <Route
            path="/signin"
            element={isAuth ? <Navigate to="/home" replace /> : <SignIn />}
          />
          <Route
            path="/signup"
            element={isAuth ? <Navigate to="/home" replace /> : <SignUp />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
