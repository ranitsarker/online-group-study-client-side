import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <>
        <div className='max-w-[1240px] mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>

        </>
    );
};

export default MainLayout;