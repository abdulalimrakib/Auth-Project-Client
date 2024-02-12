import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Profile from './../pages/Profile';
import Navbar from './../layouts/Navbar';
import PrivetRoute from "../components/PrivetRoute"
// import Footer from './../layouts/Footer';

const Index = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<PrivetRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    )
}

export default Index