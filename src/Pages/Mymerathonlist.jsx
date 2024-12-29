import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; // Importing toast
import { Link } from 'react-router-dom';

const MyMarathonList = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    // Fetch marathons created by the logged-in user
    useEffect(() => {
        const fetchMarathons = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/marathons`);
                setMarathons(response.data);
            } catch (error) {
                console.error('Error fetching marathon data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarathons();
    }, []);

    // Handle deleting a marathon
    const deleteMarathon = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/marathons/${id}`);
            setMarathons(marathons.filter((marathon) => marathon._id !== id));
            toast.success('Marathon deleted successfully!'); // Success toast
        } catch (error) {
            console.error('Error deleting marathon:', error);
            toast.error('Failed to delete marathon'); // Error toast
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">My Marathons</h2>

                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Location</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Distance</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marathons.map((marathon) => (
                            <tr key={marathon._id}>
                                <td className="py-2 px-4 border-b">{marathon.title}</td>
                                <td className="py-2 px-4 border-b">{marathon.location}</td>
                                <td className="py-2 px-4 border-b">
                                    {new Date(marathon.marathonDate).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border-b">{marathon.distance}</td>
                                <td className="py-2 px-4 border-b">
                                   <div className='flex gap-4'>
                                   <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => deleteMarathon(marathon._id)}
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/update/${marathon._id}`} className="text-white px-4 py-2 rounded bg-success">update</Link>
                                   </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Toast Container */}
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default MyMarathonList;
