import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { fetchPosts, isAdmin } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      <Navbar />
      <Header />
      {/* You can add admin dashboard link here if user is admin */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={() => navigate("/admin") }
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Admin Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;