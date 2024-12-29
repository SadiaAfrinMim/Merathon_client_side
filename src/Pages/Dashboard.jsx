import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Authprovider/AuthProvider'; // Assuming this contains user data

const Dashboard = () => {
    const { user } = useContext(AuthContext); // Get user context
    const [registrationData, setRegistrationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegistrationData = async () => {
            try {
                if (!user || !user.email) {
                    console.error('User email is missing');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/dashboard/${user.email}`
                );

                // Check if data exists
                if (response.data && Array.isArray(response.data)) {
                    setRegistrationData(response.data); // If it's an array, set it as registration data
                } else {
                    console.error('No registration data found');
                }
            } catch (error) {
                console.error('Error fetching registration data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrationData();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (registrationData.length === 0) {
        return <div>No registration data found.</div>; // Handle no data
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    Registration Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {registrationData.map((data) => (
                        <div key={data._id} className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-xl font-semibold text-gray-800">
                                <span className="text-green-600">Marathon Title: </span>
                                {data.title}
                            </p>
                            <p className="text-xl font-semibold text-gray-800">
                                <span className="text-green-600">Location: </span>
                                {data.location}
                            </p>
                            <p className="text-xl font-semibold text-gray-800">
                                <span className="text-green-600">Marathon Date: </span>
                                {new Date(data.marathonDate).toLocaleDateString()}
                            </p>
                            <p className="text-xl font-semibold text-gray-800">
                                <span className="text-green-600">Distance: </span>
                                {data.distance}
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                <span className="font-semibold text-green-600">Description: </span>
                                {data.description}
                            </p>
                            <p className="text-xl font-semibold text-gray-800">
                                <span className="text-green-600">Contact Info: </span>
                                {data.firstName} {data.lastName} - {data.contactNumber}
                            </p>
                            <p className="text-xl font-semibold text-gray-800">
                                <span className="text-green-600">Email: </span>
                                {data.email}
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                <span className="font-semibold text-green-600">Additional Info: </span>
                                {data.additionalInfo}
                            </p>
                            <p className="text-xl font-semibold text-gray-800">
                                <span className="text-green-600">Selected Date: </span>
                                {new Date(data.selectedDate).toLocaleDateString()}
                            </p>

                            {/* Image (if applicable) */}
                            {data.image && (
                                <div className="mt-6 flex justify-center">
                                    <img
                                        src={data.image}
                                        alt={data.title}
                                        className="w-full object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
