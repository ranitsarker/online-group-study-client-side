import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const { loginUser, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        console.log(email, password);

        // for login
        loginUser(email, password)
            .then((result) => {
                console.log(result.user);
                toast.success('Successfully logged in.');
                navigate (location?.state ? location.state : '/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

        //Google login
        const handleGoogleLogin = async () => {
            try {
                await googleLogin();
                toast.success('Successfully logged in.');
                navigate (location?.state ? location.state : '/');
            } catch (error) {
                console.error("Google login error:", error);
            }
            };

        // register toggle
        const handleRegisterToggle = () => {
            navigate("/register");
        };

    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center h-screen">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <button
                        onClick={handleGoogleLogin}
                        className="btn my-3 btn-outline w-full hover:border-white"
                    >
                        <FaGoogle /> Login with Google
                    </button>
                    <p className="mt-4 text-center">
                        Do not have an account?{" "}
                        <button
                            className="hover:underline"
                            type="button"
                            onClick={handleRegisterToggle}
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
