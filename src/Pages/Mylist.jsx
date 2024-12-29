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
        <div className="p-8">
            <div className='flex justify-center items-center py-8'>
                <div className="join">
                    <div>
                        <input 
                            className="input input-bordered join-item" 
                            placeholder="Search"
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} // Bind search input value
                        />
                    </div>

                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">new</span>
                        <button className="btn join-item">Search</button>
                    </div>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {registrationData.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Marathon Title</th>
                                    <th className="border border-gray-300 px-4 py-2">Start Date</th>
                                    <th className="border border-gray-300 px-4 py-2">Distance</th>
                                    <th className="border border-gray-300 px-4 py-2">Location</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrationData.map((registration) => (
                                    <tr key={registration._id}>
                                        <td className="border border-gray-300 px-4 py-2">{registration.title}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(registration.marathonDate).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{registration.distance}</td>
                                        <td className="border border-gray-300 px-4 py-2">{registration.location}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                                onClick={() => handleUpdateModalOpen(registration)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => {
                                                    setSelectedRegistrationId(registration._id);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No registrations found</p>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <input type="checkbox" id="delete-modal" className="modal-toggle" checked={showDeleteModal} onChange={() => setShowDeleteModal(!showDeleteModal)} />
            <div className="modal">
                <div className="modal-box">
                    <h2 className="text-xl font-semibold">Confirm Deletion</h2>
                    <p>Are you sure you want to delete this registration?</p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        <button className="btn btn-error" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            <input type="checkbox" id="update-modal" className="modal-toggle" checked={showUpdateModal} onChange={() => setShowUpdateModal(!showUpdateModal)} />
            <div className="modal">
                <div className="modal-box">
                    <h2 className="text-xl font-semibold">Update Registration</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="form-control">
                            <label className="label">Marathon Title</label>
                            <input
                                type="text"
                                value={selectedRegistration.title}
                                onChange={(e) => setSelectedRegistration({ ...selectedRegistration, title: e.target.value })}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Start Date</label>
                            <input
                                type="date"
                                value={selectedRegistration.marathonDate}
                                onChange={(e) => setSelectedRegistration({ ...selectedRegistration, marathonDate: e.target.value })}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Distance</label>
                            <input
                                type="text"
                                value={selectedRegistration.distance}
                                onChange={(e) => setSelectedRegistration({ ...selectedRegistration, distance: e.target.value })}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Location</label>
                            <input
                                type="text"
                                value={selectedRegistration.location}
                                onChange={(e) => setSelectedRegistration({ ...selectedRegistration, location: e.target.value })}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                            <button className="btn btn-primary" type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Mylist;
