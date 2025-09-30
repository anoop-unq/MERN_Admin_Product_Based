import express from 'express'
import {  
  changeUserData, 
  getUserById, 
  login, 
  logout, 
  register, 
  resetOtp, 
  resetPassword, 
  searchUsers, 
  sendOtp, 
  updateProfile, 
  updateProfilePhoto, 
  userAuthenticate, 
  verifyEmail, 
  verifyOtp,
  // Add admin functions
  getAllUsers,
  getUserByIdAdmin,
  updateUserRole,
  deleteUser,
  getDashboardStats,
  getAllPostsAdmin,
  deletePostAdmin
} from '../controllers/userController.js'
import {  adminAuthMiddleware, userAuthMiddleware } from '../middileware/userAuth.js'
import { handleMulterErrors, upload } from '../middlewares/upload.js'

const route = express.Router()

// Public routes
route.post("/register", upload.single('photo'), handleMulterErrors, register)
route.post("/login", login)
route.post("/logout", logout)
route.post("/user-reset-otp", resetOtp)
route.post("/user-verify-otp", verifyOtp);
route.post("/user-reset-password", resetPassword)

// Protected user routes
route.post("/verify-otp", userAuthMiddleware, sendOtp)
route.post("/verify-email", userAuthMiddleware, verifyEmail)
route.get("/user-auth", userAuthenticate)
route.put("/user/:userId", userAuthMiddleware, changeUserData)
route.put('/users/edit/:userId', userAuthMiddleware, updateProfile)
route.put("/users/edit/:userId/photo", userAuthMiddleware, upload.single('photo'), handleMulterErrors, updateProfilePhoto)
route.get("/user-details/:userId", getUserById)
route.get("/search", userAuthMiddleware, searchUsers)

// Admin only routes
route.get("/admin/users", userAuthMiddleware, adminAuthMiddleware, getAllUsers)
route.get("/admin/users/:userId", userAuthMiddleware, adminAuthMiddleware, getUserByIdAdmin)
route.patch("/admin/users/:userId/role", userAuthMiddleware, adminAuthMiddleware, updateUserRole)
route.delete("/admin/users/:userId", userAuthMiddleware, adminAuthMiddleware, deleteUser)
route.get("/admin/dashboard/stats", userAuthMiddleware, adminAuthMiddleware, getDashboardStats)
route.get("/admin/posts", userAuthMiddleware, adminAuthMiddleware, getAllPostsAdmin)
route.delete("/admin/posts/:postId", userAuthMiddleware, adminAuthMiddleware, deletePostAdmin)

export default route;