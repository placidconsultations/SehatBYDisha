import React from 'react';
import { FaUsers, FaClipboardList, FaCalendarAlt, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample data - replace with actual data from your backend
  const stats = [
    { name: 'Total Clients', value: '1,234', icon: FaUsers, change: '+12%', changeType: 'increase' },
    { name: 'Active Plans', value: '324', icon: FaClipboardList, change: '+5%', changeType: 'increase' },
    { name: 'Appointments', value: '28', icon: FaCalendarAlt, change: '-2%', changeType: 'decrease' },
    { name: 'Revenue', value: '$12,340', icon: FaChartLine, change: '+8%', changeType: 'increase' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'started a new plan', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'completed a session', time: '1 hour ago' },
    { id: 3, user: 'Mike Johnson', action: 'sent a message', time: '3 hours ago' },
    { id: 4, user: 'Sarah Williams', action: 'updated profile', time: '5 hours ago' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="font-medium">{stat.change}</span> from last week
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/admin/posts/new"
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                >
                  Add New Post
                </Link>
                <Link
                  to="/admin/posts"
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                >
                  Manage Posts
                </Link>
                <Link
                  to="/admin/clients"
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                >
                  View Clients
                </Link>
                <Link
                  to="/admin/appointments"
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                >
                  Manage Appointments
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="py-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.user}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {activity.action}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link
                  to="/admin/activity"
                  className="text-sm font-medium text-green-600 hover:text-green-500"
                >
                  View all activity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
