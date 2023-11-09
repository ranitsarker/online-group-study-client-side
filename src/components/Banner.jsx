import { motion } from "framer-motion";
const Banner = () => {
    return (
        <motion.div className="flex flex-col md:flex-row bg-blue-500 p-4"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1.4, duration: 1.4}}
        >
            <div className="md:w-1/2 p-4">
                <motion.h1 className="text-4xl font-bold text-white leading-tight"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1.1, duration: 1.1}}
                >Online Group Study Platform</motion.h1>
                <motion.p className="text-lg text-white mt-2 mb-6"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1.2, duration: 1.2}}
                >Empower your learning experience with our comprehensive online group study platform. Collaborate effectively, create and manage assignments, and engage with a diverse user community. Join us to unlock a world of shared knowledge and academic success.</motion.p>
                <motion.h2 className="text-2xl font-semibold text-white mb-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1.3, duration: 1.3}}
                >Key Features</motion.h2>
                <motion.ul className="list-disc ml-6 text-white"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1.4, duration: 1.4}}
                >
                    <li className="mb-2">Easy User Registration</li>
                    <li className="mb-2">Efficient Assignment Management</li>
                    <li className="mb-2">Seamless Assignment Submission</li>
                    <li className="mb-2">Effective Assignment Grading</li>
                    <li className="mb-2">Intuitive Assignment Filtering</li>
                    <li className="mb-2">Responsive Design for All Devices</li>
                </motion.ul>
            </div>
            <motion.div className="md:w-1/2"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1.7, duration: 1.7}}
            >
                <img src="/images/banner.jpg" alt="Banner Image" className="w-full h-auto md:max-h-full" />
            </motion.div>
        </motion.div>
    );
};

export default Banner;
