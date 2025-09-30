import { useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaCamera, FaTimes, FaCrown } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { backendUrl, setIsLogged, getUserData, register, login } = useContext(AppContext);
  const [data, setData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "user" // Default role
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const fileInputRef = useRef(null);
  const [formType, setFormType] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Detect route change and set form type
  useEffect(() => {
    if (location.pathname === "/signup") {
      setFormType("signup");
    } else {
      setFormType("login");
    }
  }, [location.pathname]);

  const toastIdAll = "fields-required";
  const nameToastId = "missing-name";
  const emailToastId = "missing-email";
  const passwordToastId = "missing-password";

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

// In your Login component - update the success handlers
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // ... validation code ...

  try {
    if (formType === "login") {
      const result = await login(data.email, data.password);
      if (result.success) {
        // toast.success("Login Successful!");
        localStorage.setItem('justLoggedIn', 'true');
        
        // Redirect to admin if user is admin
        if (result.user.role === 'admin') {
          navigate("/");
        } else {
          navigate("/");
        }
      }
    } else {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("bio", data.bio || '');
      if (photo) {
        formData.append("photo", photo);
      }

      const result = await register(formData);
      if (result.success) {
        // toast.success("User Registered Successfully!");
        localStorage.setItem('justSignedUp', 'true');
        
        // Redirect to admin if user registered as admin
        if (result.user.role === 'admin') {
          navigate("/");
        } else {
          navigate("/");
        }
      }
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.message || "Something went wrong"
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8 relative">
      {/* Sticky Navbar-like Back Button */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md z-50 flex items-center px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
          aria-label="Go back"
        >
          <FaArrowLeft className="text-white text-lg group-hover:scale-110 transition-transform" />
        </button>
        <div className="ml-4">
          <h2 className="text-white font-semibold">
            {formType === "login" ? "Sign In to Your Account" : "Create New Account"}
          </h2>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mt-16">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
              {formType === "login" ? (
                <FaLock className="text-white text-3xl" />
              ) : (
                <FaUser className="text-white text-3xl" />
              )}
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            {formType === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-blue-100 text-sm">
            {formType === "login" 
              ? "Sign in to continue your journey" 
              : "Join us to get started"
            }
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 md:p-8">
          <form className="space-y-5">
            {formType === "signup" && (
              <>
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setData(prev => ({ ...prev, role: "user" }))}
                      className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                        data.role === "user" 
                          ? "border-blue-500 bg-blue-50 text-blue-700" 
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <FaUser className="mx-auto mb-1" />
                      <span className="text-sm font-medium">User</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setData(prev => ({ ...prev, role: "admin" }))}
                      className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                        data.role === "admin" 
                          ? "border-purple-500 bg-purple-50 text-purple-700" 
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <FaCrown className="mx-auto mb-1" />
                      <span className="text-sm font-medium">Admin</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    {data.role === "admin" 
                      ? "Admin accounts have full system access" 
                      : "User accounts can browse and interact with content"
                    }
                  </p>
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                        {photoPreview ? (
                          <>
                            <img
                              src={photoPreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={removePhoto}
                              className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </>
                        ) : (
                          <FaUser className="text-gray-400" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors shadow-md"
                      >
                        <FaCamera className="text-xs" />
                      </button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <span className="text-sm text-gray-500">Optional</span>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            {formType === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/reset-password")}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {formType === "login" ? "Signing in..." : "Creating account..."}
                </div>
              ) : (
                formType === "login" ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          {/* Switch Form Type */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {formType === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => navigate(formType === "login" ? "/signup" : "/login")}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                {formType === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;