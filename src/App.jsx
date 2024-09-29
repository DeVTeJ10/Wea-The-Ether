import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home/homePage"
import AboutUsPage from "./pages/aboutUs/aboutUsPage"
import PropertiesPage from "./pages/properties/propertiesPage"
import ServicesPage from "./pages/services/servicesPage"
import ForgotPasswordPage from "./pages/forgotPassword/forgotPassword"
import ResetPasswordPage from "./pages/resetPassword/resetPassword"
import CreatePost from "./pages/createPost/createPost"
import SignupPage from "./Auth/Signup/signup"
import LoginPage from "./Auth/Login/login"






function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about-us" element={<AboutUsPage/>} />
        <Route path="/properties-page/:id" element={<PropertiesPage/>} />
        <Route path="/services-page" element={<ServicesPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
        <Route path="/create-post" element={<CreatePost/>} />
      </Routes>
    </>
  )
}

export default App