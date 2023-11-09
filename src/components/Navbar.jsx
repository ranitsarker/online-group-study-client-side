import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import logo from "../../public/images/logo.png"
import { motion } from "framer-motion";

const Navbar = () => {
    const activeStyle = {
        color: 'red', // Set the active color here
        fontWeight: 'bold',
      };

    const {user, logOut} = useContext(AuthContext);


    // logout 
    const handleLogout = () => {
        logOut()
        .then(() => {
            toast.success('Successfully logged out'); 
        })
        .catch(error => console.log(error))
    }
    const navItems = (
        <ul className="lg:flex items-center space-x-4">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/assignments'>Assignments</NavLink></li>
            {user?.email ? (
                <>
                    <li className="listitem"><NavLink to='/create-assignment'
                    exact activeStyle={activeStyle}
                    >Create Assignment</NavLink></li>
                    <li><NavLink to='/submitted-assignment'>Submitted Assignment</NavLink></li>
                    <li><NavLink to='/my-assignment'>My Assignment</NavLink></li>
                    <li>
                        <div className="relative group">
                            <div className="flex items-center">
                                {user.photoURL && (
                                    <img
                                        src={user.photoURL}
                                        alt="User Profile"
                                        className="w-8 h-8 rounded-full ml-2 group-hover:opacity-80"
                                    />
                                )}
                            </div>
                            <div className="hidden group-hover:flex absolute top-12 right-0 flex-col items-start bg-white p-2 rounded shadow">
                                <span className="text-sm font-medium">{user.email}</span> {/* Add this line to display the user's email */}
                                <button onClick={handleLogout} className="text-red-500 hover:underline cursor-pointer">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </li>
                </>
            ) : (
                <li><NavLink to='/login'>Login</NavLink></li>
            )}
        </ul>
    );
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                    </div>
                    <motion.img src={logo} alt="Online Study Group" className="w-32 h-auto"
                    initial={{ y: -200}}                    
                    animate={{ y: -10}}  
                    transition={{delay: 0.2, type: 'tween'}}                  
                    />

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                </div>
        </>
    );
};

export default Navbar;