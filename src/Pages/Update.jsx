import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Ensure you have installed this package
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Use useNavigate hook

    const [marathonDetails, setMarathonDetails] = useState({
        title: '',
        location: '',
        startRegDate: new Date(),
        endRegDate: new Date(),
        marathonDate: new Date(),
        distance: '3k',
        description: '',
        image: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch marathon details to pre-populate the form
    useEffect(() => {
        const fetchMarathonDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/marathon/${id}`);
                setMarathonDetails(response.data);
            } catch (error) {
                console.error('Error fetching marathon details:', error);
            }
        };

        fetchMarathonDetails();
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMarathonDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle date changes
    const handleDateChange = (date, field) => {
        setMarathonDetails((prevDetails) => ({
            ...prevDetails,
            [field]: date,
        }));
    };

    // Handle image URL change
    const handleImageChange = (e) => {
        setMarathonDetails((prevDetails) => ({
            ...prevDetails,
            image: e.target.value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/marathons/${id}`, marathonDetails);
            navigate('/marathons'); // Use navigate for redirecting to another page
        } catch (error) {
            toast.error('Error updating marathon:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-2xl border-2 border-orange-200">
        <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
            🏅 Update Marathon Event
            <p className="text-lg mt-3 text-amber-700">Rev Up Your Race!</p>
        </h2>
    
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Title & Location */}
                <div className="p-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl">
                    <div className="bg-white p-5 rounded-xl">
                        <label htmlFor="title" className="block text-lg font-semibold text-orange-800">🏷️ Marathon Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={marathonDetails.title}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-300"
                            placeholder="Enter marathon title"
                            required
                        />
                    </div>
                </div>
    
                <div className="p-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl">
                    <div className="bg-white p-5 rounded-xl">
                        <label htmlFor="location" className="block text-lg font-semibold text-orange-800">📍 Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={marathonDetails.location}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-300"
                            placeholder="Enter location"
                            required
                        />
                    </div>
                </div>
            </div>
    
            {/* Registration Dates */}
            <div className="p-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl">
                <div className="bg-white p-5 rounded-xl space-y-4">
                    <h3 className="text-lg font-semibold text-orange-800">📅 Registration Period</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startRegDate" className="block text-sm text-amber-700">Start Date</label>
                            <DatePicker
                                selected={marathonDetails.startRegDate}
                                onChange={(date) => handleDateChange(date, 'startRegDate')}
                                className="mt-1 p-3 w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="endRegDate" className="block text-sm text-amber-700">End Date</label>
                            <DatePicker
                                selected={marathonDetails.endRegDate}
                                onChange={(date) => handleDateChange(date, 'endRegDate')}
                                className="mt-1 p-3 w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Marathon Details */}
            <div className="p-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl">
                <div className="bg-white p-5 rounded-xl space-y-6">
                    <div>
                        <label htmlFor="marathonDate" className="block text-lg font-semibold text-orange-800">🏁 Event Date</label>
                        <DatePicker
                            selected={marathonDetails.marathonDate}
                            onChange={(date) => handleDateChange(date, 'marathonDate')}
                            className="mt-2 p-3 w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                            required
                        />
                    </div>
    
                    <div>
                        <label htmlFor="distance" className="block text-lg font-semibold text-orange-800">📏 Distance</label>
                        <select
                            id="distance"
                            name="distance"
                            value={marathonDetails.distance}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                            required
                        >
                            <option value="3k">3K Sprint</option>
                            <option value="10k">10K Challenge</option>
                            <option value="25k">25K Marathon</option>
                        </select>
                    </div>
    
                    <div>
                        <label htmlFor="description" className="block text-lg font-semibold text-orange-800">📝 Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={marathonDetails.description}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                            placeholder="Describe your marathon..."
                            rows="4"
                            required
                        />
                    </div>
    
                    <div>
                        <label htmlFor="image" className="block text-lg font-semibold text-orange-800">🌄 Image URL</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={marathonDetails.image}
                            onChange={handleImageChange}
                            className="mt-2 p-3 w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                            placeholder="Paste image URL here"
                        />
                    </div>
                </div>
            </div>
    
            {/* Submit Button */}
            <button
                type="submit"
                className={`w-full py-4 font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl shadow-lg
                    hover:from-amber-500 hover:to-orange-600 hover:shadow-xl transition-all duration-300
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">🌀</span> Updating...
                    </span>
                ) : (
                    '🚀 Update Marathon'
                )}
            </button>
        </form>
    </div>
    );
};

export default Update;
