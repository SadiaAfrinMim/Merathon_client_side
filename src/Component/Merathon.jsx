import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Marathons = () => {
    const [marathons, setMarathons] = useState([]);

    useEffect(() => {
        const fetchMarathons = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/marathons`);
                setMarathons(response.data.slice(0, 6)); // ✅ শুধুমাত্র প্রথম ৬টি আইটেম রাখবে
            } catch (error) {
                toast.error('Failed to fetch marathons');
            }
        };

        fetchMarathons();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
                Upcoming Marathons 🏃‍♂️
                <p className="text-lg mt-2 text-amber-600">Race Towards Your Goals!</p>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {marathons.map((marathon) => (
                    <div
                        key={marathon._id}
                        className="bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group overflow-hidden"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={marathon.image || 'https://i.ibb.co/xHd9jjY/marathon-3753907-1280.jpg'}
                                alt={marathon.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-900/60 to-transparent p-4">
                                <h3 className="text-xl font-bold text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                    {marathon.title}
                                </h3>
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            <div className="flex items-center gap-2 text-amber-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <p className="font-medium">{marathon.location}</p>
                            </div>

                            <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="text-sm text-amber-800">
                                    📅 Registration: <br/>
                                    <span className="font-semibold">
                                        {new Date(marathon.startRegDate).toLocaleDateString()} – {' '}
                                        {new Date(marathon.endRegDate).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-2">
                                <Link
                                    to={`/marathon/${marathon._id}`}
                                    className="inline-block w-full text-center py-2 font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-md"
                                >
                                    View Details 🏅
                                </Link>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                            {Math.floor(Math.random() * 50) + 1}% Full
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marathons;
