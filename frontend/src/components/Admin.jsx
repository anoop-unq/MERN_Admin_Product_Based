import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaChartBar, 
  FaTrash, 
  FaCrown, 
  FaUser, 
  FaEdit,
  FaEye,
  FaSearch,
  FaFileAlt,
  FaNewspaper,
  FaSignOutAlt,
  FaBars,
  FaClock,
  FaTimes,
  FaUserShield,
  FaChartLine,
  FaRocket
} from 'react-icons/fa';
import { TbLayoutDashboard } from 'react-icons/tb';
import { MdAdminPanelSettings, MdPostAdd } from 'react-icons/md';
import PostForm from './PostForm';
import PostList from './PostList';
import { Navbar } from './Navbar';

const Admin = () => {
  const { 
    isAdmin, 
    adminStats, 
    allUsers, 
    getAdminStats, 
    getAllUsers, 
    updateUserRole, 
    deleteUser,
    getAllPostsAdmin,
    allPosts,
    deletePostAdmin,
    isAdminLoading,
    userdata,
    logout
  } = useContext(AppContext);
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      getAdminStats();
      getAllUsers();
      getAllPostsAdmin();
    }
  }, [isAdmin]);

  // Redirect if not admin
  // useEffect(() => {
  //   if (!isAdmin) {
  //     navigate('/home');
  //   }
  // }, [isAdmin, navigate]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
        <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <FaUserShield className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-white/80 mb-6 text-lg">Administrator privileges required</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-purple-600 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Return to Safety
          </button>
        </div>
      </div>
    );
  }

  const handleRoleChange = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePostAdmin(postId);
    }
  };

  // Filter users based on search
  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter posts based on search
  const filteredPosts = allPosts.filter(post => 
    post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
    const today = new Date();
    const todayPosts = allPosts.filter(post => {
    const postDate = new Date(post.createdAt);
    return postDate.toDateString() === today.toDateString();
  });

  // Enhanced Stats data
  const statsData = [
    { 
      number: adminStats?.totalUsers || 0, 
      label: 'Total Users', 
      icon: FaUsers, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      description: 'Registered users'
    },
    { 
      number: adminStats?.totalAdmins || 0, 
      label: 'Administrators', 
      icon: FaUserShield, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      description: 'Admin accounts'
    },
    { 
      number: adminStats?.totalPosts || 0, 
      label: 'Total Posts', 
      icon: FaNewspaper, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
      description: 'Platform posts'
    },
    ,
       { 
      number: todayPosts.length, 
      label: "Today's Posts", 
      icon: FaClock, 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-500',
      description: 'Posts today',
      trend: 'Active engagement'
    },
  ];

  // Enhanced Navigation tabs
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TbLayoutDashboard, color: 'text-blue-500' },
    { id: 'users', label: 'User Management', icon: FaUsers, color: 'text-purple-500' },
    { id: 'posts', label: 'Post Management', icon: FaNewspaper, color: 'text-green-500' },
    { id: 'create-post', label: 'Create Post', icon: MdPostAdd, color: 'text-orange-500' },
    { id: 'view-posts', label: 'View Posts', icon: FaEye, color: 'text-cyan-500' }
  ];

  // Quick actions with enhanced styling
  const quickActions = [
    { 
      id: 'users', 
      label: 'Manage Users', 
      icon: FaUsers, 
      gradient: 'from-purple-500 to-pink-500',
      description: 'View and manage all users'
    },
    { 
      id: 'posts', 
      label: 'Manage Posts', 
      icon: FaNewspaper, 
      gradient: 'from-green-500 to-emerald-500',
      description: 'Moderate platform content'
    },
    { 
      id: 'create-post', 
      label: 'Create Post', 
      icon: MdPostAdd, 
      gradient: 'from-orange-500 to-red-500',
      description: 'Publish as administrator'
    },
    { 
      id: 'view-posts', 
      label: 'View Posts', 
      icon: FaEye, 
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Browse all platform posts'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex">
      

        {/* Main Content */}
        <div className="flex-1  mt-16  justify-center items-center">
         

          {/* Content Area */}
          <div className="p-4 lg:p-8">
            {isAdminLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500 border-b-transparent rounded-full animate-spin animation-delay-500"></div>
                </div>
              </div>
            )}

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && adminStats && (
              <div className="space-y-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="text-center lg:text-left">
                      <h1 className="text-4xl font-bold mb-4">Welcome back, Administrator!</h1>
                      <p className="text-white/80 text-lg mb-6">Manage your platform with powerful insights and tools</p>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
                          <span className="font-semibold">{adminStats.totalUsers || 0}</span> Users
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
                          <span className="font-semibold">{adminStats.totalPosts || 0}</span> Posts
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
                          <span className="font-semibold">{adminStats.totalAdmins || 0}</span> Admins
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 lg:mt-0">
                      <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
                        <FaRocket className="text-white text-4xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {statsData.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-2xl ${stat.bgColor} shadow-lg`}>
                            <IconComponent className="text-white text-xl" />
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-white">{stat.number}</div>
                            <div className="text-white/60 text-sm">{stat.description}</div>
                          </div>
                        </div>
                        <h3 className="text-white font-semibold text-lg">{stat.label}</h3>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((action, index) => {
                      const IconComponent = action.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (action.id === 'users') {
                              navigate('/admin/users');
                            } else if (action.id === 'posts') {
                              navigate('/admin/posts');
                            } else if (action.id === 'create-post') {
                              navigate('/admin/create-post');
                            } else if (action.id === 'view-posts') {
                              navigate('/home', {
                                state: {
                                  verifiyAdminBack: "product_admin_panel",
                                  source: "ViewAllProductsUser",
                                  timestamp: Date.now()
                                }
                              });
                            }
                          }}
                          className={`bg-gradient-to-br ${action.gradient} rounded-2xl p-6 text-white text-left shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <IconComponent className="text-2xl text-white/90" />
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                              <FaRocket className="text-white text-sm" />
                            </div>
                          </div>
                          <h4 className="font-bold text-lg mb-2">{action.label}</h4>
                          <p className="text-white/80 text-sm">{action.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-white/10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
                      <p className="text-white/60">Manage all users and their roles with administrative privileges</p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-slate-700/50 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full lg:w-80"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-8 py-4 text-left text-white/60 font-semibold">User</th>
                        <th className="px-8 py-4 text-left text-white/60 font-semibold">Email</th>
                        <th className="px-8 py-4 text-left text-white/60 font-semibold">Role</th>
                        <th className="px-8 py-4 text-left text-white/60 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <div 
                                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                                onClick={() => navigate(`/view-users/${user._id}`)}
                              >
                                {user.photo ? (
                                  <img className="w-12 h-12 rounded-2xl" src={user.photo} alt="" />
                                ) : (
                                  <FaUser className="text-white" />
                                )}
                              </div>
                              <div>
                                <div className="text-white font-semibold">{user.name}</div>
                                <div className="text-white/60 text-sm">ID: {user._id.slice(-8)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-white">{user.email}</div>
                          </td>
                          <td className="px-8 py-6">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user._id, e.target.value)}
                              className="bg-slate-700/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="user" className="bg-slate-800">User</option>
                              <option value="admin" className="bg-slate-800">Admin</option>
                            </select>
                          </td>
                          <td className="px-8 py-6">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="bg-red-500/20 text-red-300 p-3 rounded-xl hover:bg-red-500/30 transition-colors"
                              title="Delete User"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-16 text-white/60">
                      <FaUsers className="text-4xl mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No users found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Post Management Tab */}
            {activeTab === 'posts' && (
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-white/10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">Post Management</h2>
                      <p className="text-white/60">Manage all posts on the platform</p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                        <input
                          type="text"
                          placeholder="Search posts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-slate-700/50 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full lg:w-80"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-8 py-4 text-left text-white/60 font-semibold">Content</th>
                        <th className="px-8 py-4 text-left text-white/60 font-semibold">Author</th>
                        <th className="px-8 py-4 text-left text-white/60 font-semibold">Created</th>
                        <th className="px-8 py-4 text-left text-white/60 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6">
                            <div className="text-white max-w-xs truncate">
                              {post.content || 'No content'}
                            </div>
                            {post.images && post.images.length > 0 && (
                              <div className="text-white/60 text-sm mt-1">
                                {post.images.length} image(s)
                              </div>
                            )}
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-white">
                              {post.author?.name || 'Unknown'}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-white/60">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <button
                              onClick={() => handleDeletePost(post._id)}
                              className="bg-red-500/20 text-red-300 p-3 rounded-xl hover:bg-red-500/30 transition-colors"
                              title="Delete Post"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-16 text-white/60">
                      <FaNewspaper className="text-4xl mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No posts found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Create Post Tab */}
            {activeTab === 'create-post' && (
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-white/10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">Create Post as Admin</h2>
                      <p className="text-white/60">Create posts with administrative privileges</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <PostForm />
                </div>
              </div>
            )}

            {/* View Posts Tab */}
            {activeTab === 'view-posts' && (
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-white/10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">All Posts</h2>
                      <p className="text-white/60">View and interact with all platform posts</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <PostList />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;