import { useContext, useEffect, useState } from 'react';
import {
  FaHome,
  FaFileAlt,
  FaBell,
  FaMapMarkerAlt,
  FaChartBar,
  FaSignOutAlt,
} from 'react-icons/fa';
import { AuthContext } from '../../AuthProvider/Authprovider';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PropertyCard from '../My ProPertise/PropertyCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user, handleSignOut } = useContext(AuthContext); 
  const [activeSection, setActiveSection] = useState('dashboard'); 
  const [properties, setProperties] = useState([]);

  useEffect(() => {
      if (!user?.email) return;
  
      fetch(`https://mongodb-server-site.vercel.app/realagent?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setProperties(data))
        .catch((err) => console.log(err));
    }, [user?.email]);

  const propertiesAdded = 12;
  const pendingReviews = 5;
  const totalLikes = 1259;
  const averageRating = 4.8;
  const profileCompletion = 75;
  

  // Bar Chart
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Properties Added',
        data: [2, 3, 1, 4, 2, 5, 3, 6, 4, 2, 1, 3],
        backgroundColor: 'rgba(236, 72, 153, 0.6)', // pink
        borderColor: '#ec4899',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Property Addition Trend' },
    },
  };

  

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-pink-700 to-pink-900 text-white flex flex-col">
        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <img
              src={user?.photoURL || '/default-avatar.png'}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-pink-300 mb-4 shadow-lg"
            />
            <h2 className="font-bold text-xl">{user?.displayName || 'John Doe'}</h2>
            <p className="text-pink-200 text-sm">{user?.email}</p>
          </div>
          <nav className="flex flex-col gap-4 mt-8">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`flex items-center gap-3 py-2 px-4 rounded-lg transition ${
                activeSection === 'dashboard' ? 'bg-pink-600' : 'hover:bg-pink-600'
              }`}
            >
              <FaHome /> Dashboard
            </button>
            <button
              onClick={() => setActiveSection('properties')}
              className={`flex items-center gap-3 py-2 px-4 rounded-lg transition ${
                activeSection === 'properties' ? 'bg-pink-600' : 'hover:bg-pink-600'
              }`}
            >
              <FaFileAlt /> My Properties
            </button>
            <a
              href="#"
              className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-pink-600 transition"
            >
              <FaBell /> Notifications
            </a>
            <a
              href="#"
              className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-pink-600 transition"
            >
              <FaMapMarkerAlt /> Locations
            </a>
            <a
              href="#"
              className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-pink-600 transition"
            >
              <FaChartBar /> Analytics
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-pink-600 transition mt-auto"
            >
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeSection === 'dashboard' && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">User Dashboard</h1>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-pink-500">
                <p className="text-gray-600">
                  Total Properties Added <br />{' '}
                  <span className="text-pink-600 font-semibold text-3xl">
                    ({properties.length})
                  </span>
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-pink-500">
                <p className="text-gray-600 text-sm">Pending Reviews</p>
                <p className="text-3xl font-bold text-pink-600 mt-2">{pendingReviews}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-pink-500">
                <p className="text-gray-600 text-sm">Total Likes</p>
                <p className="text-3xl font-bold text-pink-600 mt-2">{totalLikes}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-pink-500">
                <p className="text-gray-600 text-sm">Average Rating</p>
                <p className="text-3xl font-bold text-pink-600 mt-2">{averageRating} ⭐</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                <Bar options={barChartOptions} data={barChartData} />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Completion</h3>
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="80" stroke="#f3f4f6" strokeWidth="12" fill="none" />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#ec4899"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 80}`}
                      strokeDashoffset={`${2 * Math.PI * 80 * (1 - profileCompletion / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-pink-600">{profileCompletion}%</span>
                  </div>
                </div>
                <p className="mt-6 text-gray-600 text-center">Add more properties to reach 100%!</p>
              </div>
            </div>
          </>
        )}

        {activeSection === 'properties' && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              My Properties <span className="text-pink-600">({properties.length})</span>
            </h1>
            <div>
              <div className="w-full mx-auto mt-6 grid grid-cols-3  gap-6 mt-10">
                {properties?.map((property) => (
                  <PropertyCard key={property._id} property={property}></PropertyCard>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
