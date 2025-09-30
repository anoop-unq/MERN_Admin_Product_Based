// components/admin/AdminPosts.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaTrash, FaSearch, FaArrowLeft, FaEye, FaEllipsisV } from 'react-icons/fa';
import { AdminNavbar } from './AdminNavbar';
import ConfirmationModal from '../ConfirmModal';

const AdminPosts = () => {
  const { 
    allPosts,
    getAllPostsAdmin,
    deletePostAdmin,
    isAdmin,
    isAdminLoading 
  } = useContext(AppContext);
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  useEffect(() => {
    if (isAdmin) {
      getAllPostsAdmin();
    }
  }, [isAdmin]);

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePostAdmin(postToDelete);
      setIsModalOpen(false);
      // Force refresh to get latest data
      getAllPostsAdmin();
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
      setPostToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setPostToDelete(null);
  };

  const toggleDropdown = (postId) => {
    setActiveDropdown(activeDropdown === postId ? null : postId);
  };

  const filteredPosts = allPosts.filter(post => 
    post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="p-6 sm:p-8 border-b border-white/10">
              <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Post Management</h2>
                  <p className="text-white/60 text-sm sm:text-base">Manage all posts on the platform</p>
                </div>
                <div className="w-full lg:w-auto">
                  <div className="relative max-w-md mx-auto lg:mx-0 lg:w-80">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-sm" />
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-slate-700/50 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isAdminLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-white/60 font-semibold text-sm">Content</th>
                        <th className="px-6 py-4 text-left text-white/60 font-semibold text-sm">Author</th>
                        <th className="px-6 py-4 text-left text-white/60 font-semibold text-sm">Created</th>
                        <th className="px-6 py-4 text-left text-white/60 font-semibold text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-white max-w-md line-clamp-2 text-sm">
                              {post.content || 'No content'}
                            </div>
                            {post.images && post.images.length > 0 && (
                              <div className="text-white/60 text-xs mt-1">
                                {post.images.length} image(s)
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-white text-sm">
                              {post.author?.name || 'Unknown'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-white/60 text-sm">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteClick(post._id)}
                              className="bg-red-500/20 text-red-300 p-2 rounded-lg hover:bg-red-500/30 transition-colors"
                              title="Delete Post"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden p-4 space-y-4">
                  {filteredPosts.map((post) => (
                    <div key={post._id} className="bg-slate-700/30 rounded-2xl border border-white/10 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm mb-1">
                            {post.author?.name || 'Unknown'}
                          </h3>
                          <p className="text-white/60 text-xs">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(post._id)}
                            className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <FaEllipsisV className="text-sm" />
                          </button>
                          
                          {activeDropdown === post._id && (
                            <div className="absolute right-0 top-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-10 min-w-[120px]">
                              <button
                                onClick={() => handleDeleteClick(post._id)}
                                className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/20 transition-colors flex items-center space-x-2 text-sm"
                              >
                                <FaTrash className="text-xs" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-white text-sm mb-3 line-clamp-3">
                        {post.content || 'No content'}
                      </div>
                      
                      {post.images && post.images.length > 0 && (
                        <div className="text-white/60 text-xs">
                          {post.images.length} image(s)
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-16 text-white/60">
                    <FaNewspaper className="text-4xl mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No posts found</p>
                    {searchTerm && (
                      <p className="text-sm mt-2">Try adjusting your search terms</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        loading={isDeleting}
      />
    </div>
  );
};

export default AdminPosts;