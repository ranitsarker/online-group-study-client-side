import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import ValidationForRegister from "../components/ValidationForRegister";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        // Password validation
        const passwordValidation = ValidationForRegister(password);
        if (passwordValidation) {
            toast.error(passwordValidation);
            return;
        }

        try {
            const result = await createUser(email, password, name, photoURL);

            console.log(result.user);
            toast.success('User created successfully.');
            // Clear form field values
            setName("");
            setPhotoURL("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error);

            // Check if the error is due to email already in use
            if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
                toast.error("Email is already in use. Please use a different email.");
            } else {
                toast.error("An error occurred during registration.");
            }
        }
    }

    // Login toggle
    const handleLoginToggle = () => {
        navigate('/login');
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96 m-4">
                <h1 className="text-2xl font-semibold mb-4">Registration</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photoURL" className="block text-gray-600">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            id="photoURL"
                            name="photoURL"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <button
                        className="hover:underline"
                        type="button"
                        onClick={handleLoginToggle}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
