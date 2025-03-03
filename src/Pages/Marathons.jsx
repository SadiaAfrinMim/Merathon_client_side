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
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
                🏎️ Upcoming Marathons
                <p className="text-lg mt-3 text-orange-700 font-normal">Race to Glory!</p>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {marathons.map((marathon) => (
                    <div
                        key={marathon.id}
                        className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group overflow-hidden border-2 border-orange-100 hover:border-amber-200"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={marathon.image || 'https://i.ibb.co.com/xHd9jjY/marathon-3753907-1280.jpg'}
                                alt={marathon.title}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-900/70 to-transparent p-4">
                                <h3 className="text-xl font-black text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                    {marathon.title}
                                </h3>
                            </div>
                            <div className="absolute top-2 right-2 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md animate-pulse">
                                {Math.floor(Math.random() * 30 + 70)}% Seats Filled
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="flex items-center gap-2 text-orange-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <p className="font-semibold">{marathon.location}</p>
                            </div>

                            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                                <p className="text-sm text-orange-800">
                                    📅 Registration Period:
                                    <span className="block mt-1 font-medium">
                                        {new Date(marathon.startRegDate).toLocaleDateString()} – {' '}
                                        {new Date(marathon.endRegDate).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>

                            <Link
                                to={`/marathon/${marathon._id}`}
                                className="inline-block w-full text-center py-3 font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-l"
                            >
                                View Details 🏅
                            </Link>
                        </div>

                        {/* Decorative racing elements */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
                        <div className="absolute bottom-4 -left-4 w-12 h-12 bg-amber-400 rounded-full opacity-20"></div>
                        <div className="absolute top-4 -right-4 w-12 h-12 bg-orange-400 rounded-full opacity-20"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marathons;
