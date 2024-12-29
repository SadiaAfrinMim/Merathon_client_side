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
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Update Your Marathon Event</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700">Marathon Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={marathonDetails.title}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter marathon title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-lg font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={marathonDetails.location}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter location"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="startRegDate" className="block text-lg font-medium text-gray-700">Start Registration Date</label>
                        <DatePicker
                            selected={marathonDetails.startRegDate}
                            onChange={(date) => handleDateChange(date, 'startRegDate')}
                            className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="endRegDate" className="block text-lg font-medium text-gray-700">End Registration Date</label>
                        <DatePicker
                            selected={marathonDetails.endRegDate}
                            onChange={(date) => handleDateChange(date, 'endRegDate')}
                            className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="marathonDate" className="block text-lg font-medium text-gray-700">Marathon Start Date</label>
                    <DatePicker
                        selected={marathonDetails.marathonDate}
                        onChange={(date) => handleDateChange(date, 'marathonDate')}
                        className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="distance" className="block text-lg font-medium text-gray-700">Running Distance</label>
                    <select
                        id="distance"
                        name="distance"
                        value={marathonDetails.distance}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    >
                        <option value="3k">3k</option>
                        <option value="10k">10k</option>
                        <option value="25k">25k</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={marathonDetails.description}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter marathon description"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="image" className="block text-lg font-medium text-gray-700">Marathon Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={marathonDetails.image}
                        onChange={handleImageChange}
                        className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter image URL"
                    />
                </div>

                <button
                    type="submit"
                    className={`bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-500 transition duration-300 w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating Marathon...' : 'Update Marathon'}
                </button>
            </form>
        </div>
    );
};

export default Update;
