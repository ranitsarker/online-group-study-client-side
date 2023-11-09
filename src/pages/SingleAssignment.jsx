import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAssignment } from "../providers/AssignmentProvider";
import { motion } from "framer-motion";

const SingleAssignment = () => {
    const { setAssignmentDetails } = useAssignment();
    const { id } = useParams();
    const [eachAssignment, setEachAssignment] = useState(null);
    console.log(eachAssignment);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(`https://online-group-study-server-side.vercel.app/assignment/${id}`, {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                setEachAssignment(data);
                setAssignmentDetails({ title: data.title, marks: data.marks });
                setIsLoading(false); 
            })
            .catch((error) => {
                console.error('Error fetching assignment:', error);
                setIsLoading(false);
            });
    }, [id, setAssignmentDetails]);

    if (isLoading) {
        return (
            <div className="max-w-full mx-auto p-4 flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    if (!eachAssignment) {
        return <p>Loading...</p>;
    }
    return (
        <div className="max-w-full mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg">
                <img
                    src={eachAssignment.thumbnailUrl}
                    alt={eachAssignment.title}
                    className="w-full h-auto object-cover rounded-t-lg"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-semibold mb-4">{eachAssignment.title}</h1>
                    <p className="text-gray-700 mb-2">Description: {eachAssignment.description}</p>
                    <p className="text-gray-700 mb-2">Marks: {eachAssignment.marks}</p>
                    <p className="text-gray-700 mb-2">Difficulty: {eachAssignment.difficulty}</p>
                    <p className="text-gray-700 mb-2">Due Date: {eachAssignment.dueDate}</p>
                    <p className="text-gray-700 mb-2">Created By: {eachAssignment.createdBy}</p>
                    <motion.button className="bg-blue-500 text-white px-4 py-2 rounded-md hover-bg-blue-700"
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 1 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                        <Link to="/assignment-submission" className="text-white">Take Assignment</Link>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default SingleAssignment;