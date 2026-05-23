const express = require("express")
const router = express.Router()

const auth = require("../middleware/userAuth")

const {
  register,
  login,
  logout,
  googleAuth,
  getMe,
  verifyOtp,
  updateProfile,
  forgotPassword,
  resetPassword
} = require("../controllers/authController")



// Auth Routes
router.post("/register", register)

router.post("/verify-otp", verifyOtp)

router.post("/login", login)
router.post("/forgot-password", forgotPassword)

router.post( "/reset-password/:token", resetPassword)


router.post("/google-auth", googleAuth)

router.post("/logout", logout)



// Current Logged In User
router.get("/me", auth, getMe)

router.patch(
"/update-profile",
auth,
updateProfile
)



module.exports = router