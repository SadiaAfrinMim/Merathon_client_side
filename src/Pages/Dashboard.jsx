import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Authprovider/AuthProvider';

// Reusable DetailItem component (moved outside main component)
const DetailItem = ({ label, value, color }) => (
  <div className={`flex items-center gap-2 p-2 rounded-lg ${color === 'orange' ? 'bg-orange-100' : 'bg-amber-100'}`}>
    <span className="text-lg font-semibold text-amber-700">{label}</span>
    <span className="text-orange-800">{value}</span>
  </div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [registrationData, setRegistrationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        if (!user?.email) {
          console.error('User email is missing');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/register`);
        if (response.data && Array.isArray(response.data)) {
          setRegistrationData(response.data);
        }
      } catch (error) {
        console.error('Error fetching registration data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto  p-8 rounded-2xl shadow-2xl border-2 border-orange-200">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
          🏅 Registration Details
          <p className="text-lg mt-3 text-amber-700">Your Running Achievements</p>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {registrationData.map((data) => (
            <div 
              key={data._id} 
              className=" p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-200 relative"
            >
              <div className="absolute top-2 right-2 text-orange-400">✦</div>
              <div className="absolute bottom-2 left-2 text-orange-400">✦</div>

              <div className="space-y-4">
                <div className="pb-4 border-b-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-orange-800">
                    🏃 {data.title}
                    <span className="block mt-1 text-lg text-amber-700">📍 {data.location}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <DetailItem 
                    label="📅 Date" 
                    value={new Date(data.marathonDate).toLocaleDateString()}
                    color="orange"
                  />
                  <DetailItem 
                    label="📏 Distance" 
                    value={data.distance}
                    color="amber"
                  />
                  <DetailItem 
                    label="👤 Runner" 
                    value={`${data.firstName} ${data.lastName}`}
                    color="orange"
                  />
                  <DetailItem 
                    label="📱 Contact" 
                    value={data.contactNumber}
                    color="amber"
                  />
                </div>

                <div className="p-3 bg-orange-100 rounded-lg">
                  <p className="text-orange-800">
                    <span className="font-semibold text-amber-600">📧 Email:</span> {data.email}
                  </p>
                </div>

                <div className="p-3 bg-amber-100 rounded-lg">
                  <p className="text-orange-800">
                    <span className="font-semibold text-amber-600">📝 Description:</span> {data.description}
                  </p>
                </div>

                {data.additionalInfo && (
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-800">
                      <span className="font-semibold text-amber-600">ℹ️ Additional Info:</span> {data.additionalInfo}
                    </p>
                  </div>
                )}

                <div className="p-2 bg-amber-200 rounded-md">
                  <p className="text-sm font-semibold text-orange-900">
                    🗓️ Selected Date: {new Date(data.selectedDate).toLocaleDateString()}
                  </p>
                </div>

                {data.image && (
                  <div className="mt-4">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="w-full h-48 object-cover rounded-lg border-2 border-orange-200 shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;