import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext);
    // logout 
    const handleLogout = () => {
        logOut()
        .then(() => {
            toast.success('Successfully logged out'); 
        })
        .catch(error => console.log(error))
    }
    const navItems = <>

        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/assignments'>Assignments</NavLink></li>
    { user?.email
        ?
        <>
        <li><NavLink to='/create-assignment'>Create Assignment</NavLink></li>
        <li><NavLink to='/submitted-assignment'>Submitted Assignment</NavLink></li>
        <li><NavLink to='/my-assignment'>My Assignment</NavLink></li>
        <li><button onClick={handleLogout}>Logout</button></li>
        <li>{user.email}</li>
        </>
        :
        <li><NavLink to='/login'>Login</NavLink></li>
    }

    </>
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
                    <a className="btn btn-ghost normal-case text-xl">Online Group Study</a>
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