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
        email: user?.email,
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
        <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto p-8  rounded-lg shadow-2xl border-2 border-orange-100">
            <h2 className="text-5xl font-extrabold text-center text-orange-800 mb-8 drop-shadow-[0_2px_2px_rgba(251,146,60,0.3)]">
                {marathon.title}
                <span className="block mt-4 text-2xl text-amber-700">🏃♂️ Race to Victory! 🏁</span>
            </h2>
            
            <div className="flex justify-center mb-8">
                <img
                    src={marathon.image || 'https://i.ibb.co.com/xHd9jjY/marathon-3753907-1280.jpg'}
                    alt={marathon.title}
                    className="w-full md:w-3/4 lg:w-2/3 h-80 object-cover rounded-lg shadow-md border-4 border-amber-100"
                />
            </div>
    
            <div className="space-y-6">
                <div className="p-4 rounded-xl border border-amber-200">
                    <p className="text-xl font-semibold text-orange-800">
                        <span className="text-amber-600">📍 Location: </span>{marathon.location}
                    </p>
                </div>
    
                <div className="p-4  rounded-xl border border-amber-200">
                    <p className="text-xl font-semibold text-orange-800">
                        <span className="text-amber-600">📅 Marathon Date: </span>
                        {new Date(marathon.marathonDate).toLocaleDateString()}
                    </p>
                </div>
    
                <div className="p-4  rounded-xl border border-amber-200">
                    <p className="text-xl font-semibold text-orange-800">
                        <span className="text-amber-600">👥 Total Registrations: </span>
                        {totalRegistrations}
                    </p>
                </div>
    
                <div className="p-4  rounded-xl border border-amber-200">
                    <p className="text-lg text-orange-800 leading-relaxed">
                        <span className="font-semibold text-amber-600">📝 Description:</span>
                        <br />
                        {marathon.description}
                    </p>
                </div>
            </div>
    
            {/* Registration Form */}
            {isRegistrationOpen && (
                <div className="mt-12">
                    <h3 className="text-2xl font-semibold text-orange-800 mb-6 bg-amber-100 p-4 rounded-xl">
                        Register for {marathon.title}
                    </h3>
                    
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Form fields with orange/yellow focus */}
                            {[
                                { id: 'email', label: 'Email', type: 'email', readOnly: true },
                                { id: 'firstName', label: 'First Name', type: 'text' },
                                { id: 'lastName', label: 'Last Name', type: 'text' },
                                { id: 'contactNumber', label: 'Contact Number', type: 'tel' }
                            ].map((field) => (
                                <div key={field.id}>
                                    <label htmlFor={field.id} className="block text-lg font-medium text-orange-800">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        id={field.id}
                                        name={field.id}
                                        value={formData[field.id]}
                                        onChange={handleChange}
                                        className="mt-2 p-3 w-full border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-300"
                                        required={!field.readOnly}
                                        readOnly={field.readOnly}
                                    />
                                </div>
                            ))}
                        </div>
    
                        {/* Additional Info */}
                        <div>
                            <label htmlFor="additionalInfo" className="block text-lg font-medium text-orange-800">
                                Additional Information
                            </label>
                            <textarea
                                id="additionalInfo"
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleChange}
                                className="mt-2 p-3 w-full border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-300"
                                placeholder="Any special requirements or notes"
                            />
                        </div>
    
                        {/* Date Picker */}
                        <div>
                            <label htmlFor="selectedDate" className="block text-lg font-medium text-orange-800">
                                Select Race Date
                            </label>
                            <DatePicker
                                selected={formData.selectedDate}
                                onChange={(date) => setFormData({ ...formData, selectedDate: date })}
                                minDate={new Date(marathon.startRegDate)}
                                maxDate={new Date(marathon.endRegDate)}
                                className="mt-2 p-3 w-full border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-300"
                            />
                        </div>
    
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-6 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 w-full font-bold ${
                                isRegistering || !isSelectedDateWithinRegistrationWindow ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isRegistering || !isSelectedDateWithinRegistrationWindow}
                        >
                            {isRegistering ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin">⏳</span> Registering...
                                </span>
                            ) : (
                                'Register Now 🏃♀️'
                            )}
                        </button>
                    </form>
                </div>
            )}
    
            {/* Registration Closed Message */}
            {!isRegistrationOpen && (
                <div className="mt-12 text-center p-6 bg-amber-100 rounded-xl">
                    <p className="text-xl text-orange-800 font-semibold">
                        🚫 Registration Closed
                        <span className="block mt-2 text-lg text-amber-700">Stay tuned for next season!</span>
                    </p>
                </div>
            )}
        </div>
    </div>
    );
};

export default MarathonDetails;
