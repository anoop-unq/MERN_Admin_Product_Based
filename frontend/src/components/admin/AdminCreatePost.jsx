// components/admin/AdminCreatePost.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import PostForm from '../PostForm';
import { AdminNavbar } from './AdminNavbar';

const AdminCreatePost = () => {
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
      
      <div className="pt-20 pb-8 px-4 lg:px-8">
        {/* Back to Admin Dashboard */}
       

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
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
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePost;