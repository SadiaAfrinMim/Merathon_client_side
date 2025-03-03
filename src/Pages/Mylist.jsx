import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authprovider/AuthProvider';
import toast from 'react-hot-toast';

const Mylist = () => {
    const { user } = useContext(AuthContext);
    const [registrationData, setRegistrationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedRegistration, setSelectedRegistration] = useState({
        title: '',
        marathonDate: '',
        distance: '',
        location: ''
    });

    // Fetch user registration data when the component mounts or when the search query changes
    useEffect(() => {
        const fetchRegistrationData = async () => {
            if (!user || !user.email) {
                console.error('User email is missing');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Fetch registration data from API based on user email and search query
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/dashboard/${user.email}?search=${search}`
                );
                
                if (response.data && Array.isArray(response.data)) {
                    setRegistrationData(response.data);
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
    }, [user, search]);  // Re-fetch when `user` or `search` changes

    const handleDelete = async () => {
        try {
            // Call API to delete the registration
            await axios.delete(`${import.meta.env.VITE_API_URL}/regimerathon/${selectedRegistrationId}`);
            setRegistrationData((prevData) => prevData.filter((reg) => reg._id !== selectedRegistrationId));
            setShowDeleteModal(false);
            toast.success('Registration deleted successfully'); // Success toast
        } catch (error) {
            console.error('Error deleting registration:', error);
            toast.error('Error deleting registration'); // Error toast
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call API to update the registration
            const updatedData = {
                title: selectedRegistration.title,
                marathonDate: selectedRegistration.marathonDate,
                distance: selectedRegistration.distance,
                location: selectedRegistration.location
            };
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/regimerathon/${selectedRegistrationId}`, updatedData);
            if (response.status === 200) {
                // Update the registration list after successful update
                setRegistrationData((prevData) =>
                    prevData.map((reg) =>
                        reg._id === selectedRegistrationId ? { ...reg, ...updatedData } : reg
                    )
                );
                setShowUpdateModal(false);
                toast.success('Registration updated successfully'); // Success toast
            }
        } catch (error) {
            console.error('Error updating registration:', error);
            toast.error('Error updating registration'); // Error toast
        }
    };

    const handleUpdateModalOpen = (registration) => {
        setSelectedRegistrationId(registration._id);
        setSelectedRegistration({
            title: registration.title,
            marathonDate: registration.marathonDate,
            distance: registration.distance,
            location: registration.location
        });
        setShowUpdateModal(true);
    };

    return (
        <div className="p-8  min-h-screen">
        {/* Search Section */}
        <div className='flex justify-center items-center py-8'>
            <div className="join w-full max-w-md">
                <input 
                    className="input join-item w-full border-2 border-orange-300 focus:border-orange-500 focus:outline-none bg-yellow-50 placeholder-orange-400" 
                    placeholder="🔍 Search marathons..."
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn join-item bg-gradient-to-r from-orange-400 to-amber-500 text-white hover:from-orange-500 hover:to-amber-600 border-0">
                    Search
                </button>
            </div>
        </div>
    
        {loading ? (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
            </div>
        ) : (
            <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-orange-200 bg-white">
                {registrationData.length > 0 ? (
                    <table className="min-w-full table-auto">
                        <thead className="bg-gradient-to-r from-orange-400 to-amber-500 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold">Marathon Title</th>
                                <th className="px-6 py-4 text-left">📅 Date</th>
                                <th className="px-6 py-4 text-left">📏 Distance</th>
                                <th className="px-6 py-4 text-left">📍 Location</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-100">
                            {registrationData.map((registration) => (
                                <tr key={registration._id} className="hover:bg-orange-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-orange-900">{registration.title}</td>
                                    <td className="px-6 py-4 text-orange-800">
                                        {new Date(registration.marathonDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-orange-800">{registration.distance}</td>
                                    <td className="px-6 py-4 text-orange-800">{registration.location}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-3">
                                            <button
                                                className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-md"
                                                onClick={() => handleUpdateModalOpen(registration)}
                                            >
                                                ✏️ Update
                                            </button>
                                            <button
                                                className="bg-gradient-to-r from-red-400 to-orange-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-md"
                                                onClick={() => {
                                                    setSelectedRegistrationId(registration._id);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-orange-600 text-xl">🏃 No registrations found!</p>
                    </div>
                )}
            </div>
        )}
    
        {/* Delete Modal */}
        <input type="checkbox" id="delete-modal" className="modal-toggle" checked={showDeleteModal} />
        <div className="modal">
            <div className="modal-box bg-orange-50 border-2 border-orange-200">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
                    Confirm Deletion
                </h2>
                <p className="py-4 text-orange-800">❌ Are you sure you want to delete this registration?</p>
                <div className="modal-action gap-4">
                    <button 
                        className="btn bg-gray-100 text-orange-600 hover:bg-gray-200 border-orange-200"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </button>
                    <button 
                        className="btn bg-gradient-to-r from-red-400 to-orange-600 text-white hover:opacity-90"
                        onClick={handleDelete}
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    
        {/* Update Modal */}
        <input type="checkbox" id="update-modal" className="modal-toggle" checked={showUpdateModal} />
        <div className="modal">
            <div className="modal-box bg-orange-50 border-2 border-orange-200">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500 mb-6">
                    ✨ Update Registration
                </h2>
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label text-orange-800 font-semibold">Marathon Title</label>
                        <input
                            type="text"
                            className="input input-bordered border-orange-300 bg-yellow-50 focus:border-orange-500"
                            value={selectedRegistration.title}
                            onChange={(e) => setSelectedRegistration({ ...selectedRegistration, title: e.target.value })}
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label text-orange-800 font-semibold">📅 Date</label>
                            <input
                                type="date"
                                className="input input-bordered border-orange-300 bg-yellow-50 focus:border-orange-500"
                                value={selectedRegistration.marathonDate}
                                onChange={(e) => setSelectedRegistration({ ...selectedRegistration, marathonDate: e.target.value })}
                                required
                            />
                        </div>
                        
                        <div className="form-control">
                            <label className="label text-orange-800 font-semibold">📏 Distance</label>
                            <input
                                type="text"
                                className="input input-bordered border-orange-300 bg-yellow-50 focus:border-orange-500"
                                value={selectedRegistration.distance}
                                onChange={(e) => setSelectedRegistration({ ...selectedRegistration, distance: e.target.value })}
                                required
                            />
                        </div>
                    </div>
    
                    <div className="form-control">
                        <label className="label text-orange-800 font-semibold">📍 Location</label>
                        <input
                            type="text"
                            className="input input-bordered border-orange-300 bg-yellow-50 focus:border-orange-500"
                            value={selectedRegistration.location}
                            onChange={(e) => setSelectedRegistration({ ...selectedRegistration, location: e.target.value })}
                            required
                        />
                    </div>
    
                    <div className="modal-action gap-4">
                        <button 
                            type="button"
                            className="btn bg-gray-100 text-orange-600 hover:bg-gray-200 border-orange-200"
                            onClick={() => setShowUpdateModal(false)}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="btn bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:opacity-90"
                        >
                            Update Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Mylist;
