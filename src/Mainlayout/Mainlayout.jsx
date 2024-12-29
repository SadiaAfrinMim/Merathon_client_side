import { useContext } from "react";
import { AuthContext } from "../Authprovider/AuthProvider";
import Navbar from "../Component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";


const Mainlayout = () => {
    const { isDark,setIsDark } = useContext(AuthContext);
    return (
        <div className='' data-theme={isDark ? "dark" : "light"}  isChecked={isDark} handleChange={() => setIsDark(!isDark)}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Mainlayout;