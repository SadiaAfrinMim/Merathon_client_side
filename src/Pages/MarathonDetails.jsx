import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../Authprovider/AuthProvider';

const MarathonDetails = () => {
    const {user} = useContext(AuthContext)
    const { id } = useParams();
    const [marathon, setMarathon] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        email: user.email,
        firstName: '',
        lastName: '',
        contactNumber: '',
        additionalInfo: '',
        selectedDate: new Date(), // Initialize selected date
    });
    const [totalRegistrations, setTotalRegistrations] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarathonDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/marathon/${id}`);
                setMarathon(response.data);
                setTotalRegistrations(response.data.totalRegistrations);

                // Auto-fill email if user is logged in
                const loggedInUser = JSON.parse(localStorage.getItem('user')); // Update with actual user logic
                if (loggedInUser) {
                    setFormData(prevState => ({
                        ...prevState,
                        email: loggedInUser.email,
                    }));
                }
            } catch (error) {
                toast.error('Failed to fetch marathon details');
            }
        };

        fetchMarathonDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsRegistering(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
                marathonId: id,
                title: marathon.title,
                createdBy: marathon.createdBy,
                
image: marathon.image,

description: marathon.description,

distance: marathon.distance,
location: marathon.location,

marathonDate: marathon.marathonDate,

               
                ...formData,
            });

            setTotalRegistrations(prevCount => prevCount + 1);
            toast.success('Registration successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Registration failed!');
        } finally {
            setIsRegistering(false);
        }
    };

    if (!marathon) return <div className="text-center text-xl text-gray-500">Loading...</div>;

    // Registration open or closed logic
    const isRegistrationOpen = new Date() >= new Date(marathon.startRegDate) && new Date() <= new Date(marathon.endRegDate);

    // Compare selected date with registration window
    const isSelectedDateWithinRegistrationWindow = new Date(formData.selectedDate) >= new Date(marathon.startRegDate) && new Date(formData.selectedDate) <= new Date(marathon.endRegDate);

    return (
        <div className="bg-gradient-to-br from-green-300 via-green-500 to-green-700 min-h-screen py-12">
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-2xl">
                <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-8">{marathon.title}</h2>
                <div className="flex justify-center mb-8">
                    <img
                        src={marathon.image || 'https://via.placeholder.com/600x400'}
                        alt={marathon.title}
                        className="w-full md:w-3/4 lg:w-2/3 h-80 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="space-y-6">
                    <p className="text-xl font-semibold text-gray-800">
                        <span className="text-green-600">Location: </span>{marathon.location}
                    </p>
                    <p className="text-xl font-semibold text-gray-800">
                        <span className="text-green-600">Marathon Date: </span>
                        {new Date(marathon.marathonDate).toLocaleDateString()}
                    </p>
                    <p className="text-xl font-semibold text-gray-800">
                        <span className="text-green-600">Total Registrations: </span>
                        {totalRegistrations}
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-green-600">Description:</span>
                        <br />
                        {marathon.description}
                    </p>
                </div>

                {/* Registration Form */}
                {isRegistrationOpen && (
                    <div className="mt-12">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Register for {marathon.title}</h3>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData?.email}
                                        onChange={handleChange}
                                        className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-lg font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contactNumber" className="block text-lg font-medium text-gray-700">Contact Number</label>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="additionalInfo" className="block text-lg font-medium text-gray-700">Additional Information</label>
                                <textarea
                                    id="additionalInfo"
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Any additional info"
                                />
                            </div>

                            {/* Date Picker */}
                            <div>
                                <label htmlFor="selectedDate" className="block text-lg font-medium text-gray-700">Select Date</label>
                                <DatePicker
                                    selected={formData.selectedDate}
                                    onChange={(date) => setFormData({ ...formData, selectedDate: date })}
                                    minDate={new Date(marathon.startRegDate)}
                                    maxDate={new Date(marathon.endRegDate)}
                                    className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className={`bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-500 transition duration-300 w-full ${isRegistering || !isSelectedDateWithinRegistrationWindow ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isRegistering || !isSelectedDateWithinRegistrationWindow}
                            >
                                {isRegistering ? 'Registering...' : 'Register'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Registration Closed Message */}
                {!isRegistrationOpen && (
                    <div className="mt-12 text-center">
                        <p className="text-xl text-gray-600">Registration for this marathon is closed.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarathonDetails;
