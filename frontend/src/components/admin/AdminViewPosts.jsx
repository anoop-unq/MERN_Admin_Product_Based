// components/admin/AdminViewPosts.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PostList from '../PostList';
import { AdminNavbar } from './AdminNavbar';

const AdminViewPosts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminNavbar 
        state={{
          verifiyKey: "admin-panel",
          source: "ViewAllProductsUser",
          timestamp: Date.now()
        }}
      />
      
      <div className="pt-20 pb-8 px-3 sm:px-4 lg:px-8">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="p-4 sm:p-6 lg:p-8 border-b border-white/10">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">All Posts</h2>
                  <p className="text-white/60 text-sm sm:text-base">View and interact with all platform posts</p>
                </div>
                
                {/* Mobile Back Button */}
                <button
                  onClick={() => navigate(-1)}
                  className="sm:hidden flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 w-full sm:w-auto"
                >
                  <FaArrowLeft className="text-sm" />
                  <span>Back</span>
                </button>
                
                {/* Desktop Back Button */}
                <button
                  onClick={() => navigate(-1)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
                >
                  <FaArrowLeft />
                  <span>Back to Dashboard</span>
                </button>
              </div>
            </div>
            
            {/* Posts Container */}
            <div className="p-2 sm:p-4 lg:p-6">
              <div className="bg-slate-800/40 rounded-xl sm:rounded-2xl border border-white/5 p-3 sm:p-4">
                <div className="overflow-hidden">
                  <div className="min-w-0">
                    <PostList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewPosts;