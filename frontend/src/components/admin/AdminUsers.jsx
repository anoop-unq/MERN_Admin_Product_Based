// components/admin/AdminUsers.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaTrash, FaUser, FaSearch, FaArrowLeft, FaEnvelope, FaIdCard, FaCrown, FaUserShield } from 'react-icons/fa';
import { AdminNavbar } from './AdminNavbar';
import ConfirmationModal from '../ConfirmModal';

const AdminUsers = () => {
  const { 
    allUsers, 
    getAllUsers, 
    updateUserRole, 
    deleteUser,
    isAdmin,
    isAdminLoading 
  } = useContext(AppContext);
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    if (isAdmin) {
      getAllUsers();
    }
  }, [isAdmin]);

  const handleRoleChange = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(userToDelete);
      setIsModalOpen(false);
      getAllUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: {
        color: 'bg-gradient-to-r from-purple-500 to-pink-500',
        icon: FaCrown,
        text: 'Admin'
      },
      user: {
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        icon: FaUser,
        text: 'User'
      }
    };
    
    const config = roleConfig[role] || roleConfig.user;
    const IconComponent = config.icon;
    
    return (
      <span className={`${config.color} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit`}>
        <IconComponent className="text-xs" />
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminNavbar 
        state={{
          verifiyKey: "admin-panel",
          source: "ViewAllProductsUser",
          timestamp: Date.now()
        }}
      />
      
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
           
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">User Management</h1>
                <p className="text-white/60 text-sm sm:text-base">
                  Manage all users and their roles with administrative privileges
                </p>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10 min-w-[120px]">
                <div className="text-2xl font-bold text-white">{allUsers.length}</div>
                <div className="text-white/60 text-xs">Total Users</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10 min-w-[120px]">
                <div className="text-2xl font-bold text-white">
                  {allUsers.filter(user => user.role === 'admin').length}
                </div>
                <div className="text-white/60 text-xs">Admins</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
              />
            </div>
          </div>
        </div>

        {/* Users Table/Cards */}
        <div className="max-w-7xl mx-auto">
          {isAdminLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-white/60 font-semibold">User</th>
                        <th className="px-6 py-4 text-left text-white/60 font-semibold">Email</th>
                        <th className="px-6 py-4 text-left text-white/60 font-semibold">Role</th>
                        <th className="px-6 py-4 text-left text-white/60 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div 
                              className="flex items-center space-x-4 cursor-pointer"
                              onClick={() => navigate(`/view-users/${user._id}`)}
                            >
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                {user.photo ? (
                                  <img 
                                    className="w-12 h-12 rounded-2xl object-cover" 
                                    src={user.photo} 
                                    alt={user.name} 
                                  />
                                ) : (
                                  <FaUser className="text-white text-lg" />
                                )}
                              </div>
                              <div>
                                <div className="text-white font-semibold text-base">{user.name}</div>
                                <div className="text-white/60 text-sm flex items-center gap-1">
                                  <FaIdCard className="text-xs" />
                                  ID: {user._id.slice(-8)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-white flex items-center gap-2">
                              <FaEnvelope className="text-white/60 text-sm" />
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user._id, e.target.value)}
                              className="bg-slate-700/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm min-w-[120px]"
                            >
                              <option value="user" className="bg-slate-800">User</option>
                              <option value="admin" className="bg-slate-800">Admin</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteClick(user._id)}
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                              title="Delete User"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-16 text-white/60">
                    <FaUsers className="text-5xl mx-auto mb-4 opacity-50" />
                    <p className="text-xl mb-2">No users found</p>
                    <p className="text-sm">Try adjusting your search terms</p>
                  </div>
                )}
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {filteredUsers.map((user) => (
                  <div 
                    key={user._id} 
                    className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="flex items-center space-x-4 flex-1 cursor-pointer"
                        onClick={() => navigate(`/view-users/${user._id}`)}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          {user.photo ? (
                            <img 
                              className="w-16 h-16 rounded-2xl object-cover" 
                              src={user.photo} 
                              alt={user.name} 
                            />
                          ) : (
                            <FaUser className="text-white text-xl" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-lg truncate">{user.name}</h3>
                          <div className="text-white/60 text-sm flex items-center gap-1 mt-1">
                            <FaIdCard className="text-xs" />
                            ID: {user._id.slice(-8)}
                          </div>
                          <div className="text-white/60 text-sm flex items-center gap-1 mt-1">
                            <FaEnvelope className="text-xs" />
                            <span className="truncate">{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getRoleBadge(user.role)}
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="bg-slate-700/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteClick(user._id)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-16 text-white/60 bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10">
                    <FaUsers className="text-5xl mx-auto mb-4 opacity-50" />
                    <p className="text-xl mb-2">No users found</p>
                    <p className="text-sm">Try adjusting your search terms</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        loading={isDeleting}
      />
    </div>
  );
};

export default AdminUsers;