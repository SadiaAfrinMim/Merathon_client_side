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
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-2xl border-2 border-orange-200">
    <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
        🏃♂️ Create Your Marathon Event
        <p className="text-lg mt-3 text-amber-700">Fuel the Running Passion!</p>
    </h2>

    <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title & Location */}
            <div className="space-y-4">
                <div className="p-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-lg">
                    <div className="bg-white p-5 rounded-lg">
                        <label htmlFor="title" className="block text-lg font-semibold text-orange-800">🏷️ Marathon Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={marathonDetails.title}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-300"
                            placeholder="Enter marathon title"
                            required
                        />
                    </div>
                </div>

                <div className="p-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-lg">
                    <div className="bg-white p-5 rounded-lg">
                        <label htmlFor="location" className="block text-lg font-semibold text-orange-800">📍 Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={marathonDetails.location}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-300"
                            placeholder="Enter location"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Date Pickers */}
            <div className="space-y-4">
                <div className="p-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-lg">
                    <div className="bg-white p-5 rounded-lg">
                        <label className="block text-lg font-semibold text-orange-800">📅 Registration Period</label>
                        <div className="grid gap-4 mt-4">
                            <div>
                                <label htmlFor="startRegDate" className="block text-sm text-amber-700">Start Date</label>
                                <DatePicker
                                    selected={marathonDetails.startRegDate}
                                    onChange={(date) => handleDateChange(date, 'startRegDate')}
                                    className="mt-1 p-3 w-full border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="endRegDate" className="block text-sm text-amber-700">End Date</label>
                                <DatePicker
                                    selected={marathonDetails.endRegDate}
                                    onChange={(date) => handleDateChange(date, 'endRegDate')}
                                    className="mt-1 p-3 w-full border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Marathon Details Section */}
        <div className="p-1 bg-gradient-to-r from-amber-200 to-orange-200 rounded-lg">
            <div className="bg-white p-6 rounded-lg space-y-6">
                <div>
                    <label htmlFor="marathonDate" className="block text-lg font-semibold text-orange-800">🏁 Event Date</label>
                    <DatePicker
                        selected={marathonDetails.marathonDate}
                        onChange={(date) => handleDateChange(date, 'marathonDate')}
                        className="mt-2 p-3 w-full border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-amber-500"
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
                        className="mt-2 p-3 w-full border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                        required
                    >
                        <option value="3k">3K Fun Run</option>
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
                        className="mt-2 p-3 w-full border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                        placeholder="Describe your marathon event..."
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
                        className="mt-2 p-3 w-full border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                        placeholder="Paste image URL here"
                    />
                </div>
            </div>
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            className={`w-full py-4 font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg
                hover:from-amber-600 hover:to-orange-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
        >
            {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🌀</span> Creating Event...
                </span>
            ) : (
                '🚀 Launch Marathon Event'
            )}
        </button>
    </form>
</div>
  );
};

export default AddMarathon;
