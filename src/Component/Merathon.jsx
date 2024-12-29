import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Marathons = () => {
    const [marathons, setMarathons] = useState([]);

    useEffect(() => {
        // Fetch the list of marathons when the component mounts
        const fetchMarathons = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/marathons`);
                setMarathons(response.data);
            } catch (error) {
                toast.error('Failed to fetch marathons');
            }
        };

        fetchMarathons();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Upcoming Marathons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {marathons.map((marathon) => (
                    <div
                        key={marathon._id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                        <img
                            src={marathon.image || 'https://i.ibb.co.com/xHd9jjY/marathon-3753907-1280.jpg'}
                            alt={marathon.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-900">{marathon.title}</h3>
                            <p className="text-gray-700">{marathon.location}</p>
                            <p className="text-sm text-gray-500">
                                Registration: {new Date(marathon.startRegDate).toLocaleDateString()} -{' '}
                                {new Date(marathon.endRegDate).toLocaleDateString()}
                            </p>
                            <div className="mt-4">
                                <Link
                                    to={`/marathon/${marathon._id}`}
                                    className="inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition duration-300"
                                >
                                    See Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marathons;
