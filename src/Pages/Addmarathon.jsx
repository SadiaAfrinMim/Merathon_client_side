import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Authprovider/AuthProvider';

const AddMarathon = () => {
    const{user} = useContext(AuthContext)
  const [marathonDetails, setMarathonDetails] = useState({
    title: '',
    startRegDate: new Date(),
    endRegDate: new Date(),
    marathonDate: new Date(),
    location: '',
    distance: '10k', // Default value
    description: '',
    image: '',
    createdAt: new Date(),
    createdBy: user.email,
    totalRegistrations: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  useEffect(() => {
    // Fetch marathon data if necessary, adjust the API endpoint accordingly
    const handleAddMarathon = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/addmarathon`);
        setMarathonDetails(prevState => ({
          ...prevState,
          title: data.title || '',
          location: data.location || '',
          startRegDate: new Date(data.startRegDate),
          endRegDate: new Date(data.endRegDate),
          marathonDate: new Date(data.marathonDate),
          distance: data.distance || '10k',
          description: data.description || '',
          image: data.image || ''
        }));
      } catch (error) {
        toast.error('Failed to fetch marathon data');
      }
    };

    handleAddMarathon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarathonDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setMarathonDetails(prevState => ({
      ...prevState,
      [field]: date
    }));
  };

  const handleImageChange = (e) => {
    setMarathonDetails(prevState => ({
      ...prevState,
      image: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state to true

    try {
      // Example: Replace with actual API call
      await axios.post(`${import.meta.env.VITE_API_URL}/addmerathon`, marathonDetails);
      
      // On success, show a success toast
      toast.success('Marathon created successfully!');
      // Reset form or redirect if needed
      setMarathonDetails({
        title: '',
        startRegDate: new Date(),
        endRegDate: new Date(),
        marathonDate: new Date(),
        createdBy: user.email,
        location: '',
        distance: '10k',
        description: '',
        image: '',
        createdAt: new Date(),
        totalRegistrations: 0
      });
    } catch (error) {
      toast.error('Failed to create marathon!');
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Create Your Marathon Event</h2>

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
          {isSubmitting ? 'Creating Marathon...' : 'Create Marathon'}
        </button>
      </form>
    </div>
  );
};

export default AddMarathon;
