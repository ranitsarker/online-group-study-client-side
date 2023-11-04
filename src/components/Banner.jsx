const Banner = () => {
    return (
        <div className="flex flex-col md:flex-row bg-blue-500 p-4">
            <div className="md:w-1/2 p-4">
                <h1 className="text-4xl font-bold text-white leading-tight">Online Group Study Platform</h1>
                <p className="text-lg text-white mt-2 mb-6">Empower your learning experience with our comprehensive online group study platform. Collaborate effectively, create and manage assignments, and engage with a diverse user community. Join us to unlock a world of shared knowledge and academic success.</p>
                <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="list-disc ml-6 text-white">
                    <li className="mb-2">Easy User Registration</li>
                    <li className="mb-2">Efficient Assignment Management</li>
                    <li className="mb-2">Seamless Assignment Submission</li>
                    <li className="mb-2">Effective Assignment Grading</li>
                    <li className="mb-2">Intuitive Assignment Filtering</li>
                    <li className="mb-2">Responsive Design for All Devices</li>
                </ul>
            </div>
            <div className="md:w-1/2">
                <img src="/images/banner.jpg" alt="Banner Image" className="w-full h-auto md:max-h-full" />
            </div>
        </div>
    );
};

export default Banner;
