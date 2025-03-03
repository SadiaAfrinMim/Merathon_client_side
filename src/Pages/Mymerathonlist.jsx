import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Authprovider/AuthProvider';

const MyMarathonList = () => {
    const { user } = useContext(AuthContext);
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarathons = async () => {
            try {
                if (!user?.email) {
                    toast.error('Please login to view marathons');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/marathonss?createdBy=${user.email}`
                );
                
                setMarathons(response.data);
            } catch (error) {
                console.error('Error fetching marathon data:', error);
                toast.error('Failed to load marathons');
            } finally {
                setLoading(false);
            }
        };

        fetchMarathons();
    }, [user]);

    const deleteMarathon = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/marathons/${id}`);
            setMarathons(marathons.filter((marathon) => marathon._id !== id));
            toast.success('Marathon deleted successfully!');
        } catch (error) {
            console.error('Error deleting marathon:', error);
            toast.error('Failed to delete marathon');
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-orange-100/50 backdrop-blur-sm flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto p-8 rounded-2xl shadow-2xl border-2 border-orange-200">
                <h2 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
                    🏆 {user?.email}'s Marathons
                    <p className="text-lg mt-3 text-amber-700">Manage Your Running Events</p>
                </h2>

                {marathons.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-orange-600 mb-4">
                            No marathons found for {user?.email}
                        </p>
                        <Link 
                            to="/Add-Marathons" 
                            className="btn bg-gradient-to-r from-orange-500 to-amber-400 text-white hover:scale-105 transition-transform"
                        >
                            Create New Marathon
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {marathons.map((marathon) => (
                            marathon.createdBy === user?.email && (
                                <div 
                                    key={marathon._id}
                                    className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-200 relative group bg-white"
                                >
                                    <div className="absolute top-2 right-2 text-orange-400">✦</div>
                                    <div className="absolute bottom-2 left-2 text-orange-400">✦</div>

                                    <div className="space-y-4">
                                        <div className="pb-4 border-b-2 border-orange-200">
                                            <h3 className="text-2xl font-bold text-orange-800">
                                                🏃 {marathon.title}
                                                <span className="block mt-1 text-lg text-amber-700">
                                                    📍 {marathon.location}
                                                </span>
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-2 bg-orange-100 rounded-lg">
                                                <p className="text-sm font-semibold text-amber-700">📅 Date</p>
                                                <p className="text-orange-800">
                                                    {new Date(marathon.marathonDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="p-2 bg-amber-100 rounded-lg">
                                                <p className="text-sm font-semibold text-amber-700">📏 Distance</p>
                                                <p className="text-orange-800">{marathon.distance}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-4">
                                            <button
                                                className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md flex-1"
                                                onClick={() => deleteMarathon(marathon._id)}
                                            >
                                                🗑️ Delete
                                            </button>
                                            <Link
                                                to={`/update/${marathon._id}`}
                                                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md flex-1 text-center"
                                            >
                                                ✏️ Update
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}

                <Toaster 
                    position="top-center"
                    toastOptions={{
                        style: {
                            background: '#ea580c',
                            color: '#fff',
                            border: '2px solid #f59e0b',
                            fontSize: '1.1rem'
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#ea580c',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default MyMarathonList;