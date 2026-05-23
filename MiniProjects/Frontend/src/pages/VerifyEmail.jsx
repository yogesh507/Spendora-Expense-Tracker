import { useState } from "react"
import {
  useLocation,
  useNavigate,
  Link
} from "react-router-dom"

import api from "../api/axios"

function VerifyEmail() {

  const location =
    useLocation()

  const navigate =
    useNavigate()

  const emailId =
    location.state?.emailId || ""

  const [otp, setOtp] =
    useState("")

  const [error, setError] =
    useState("")

  const [success, setSuccess] =
    useState("")

  const [loading, setLoading] =
    useState(false)



  const handleVerify =
    async (e) => {

      e.preventDefault()

      try {

        setLoading(true)
        setError("")
        setSuccess("")

        const res =
          await api.post(
            "/verify-otp",
            {
              emailId,
              otp
            }
          )

        setSuccess(
          res.data.message
        )

        setTimeout(() => {
          navigate("/dashboard")
        }, 1200)

      } catch (err) {

        setError(
          err.response?.data?.message ||
          "Verification failed"
        )

      } finally {
        setLoading(false)
      }
    }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Spendora
          </h1>

          <h2 className="text-3xl font-bold text-slate-900">
            Verify Email
          </h2>

          <p className="text-slate-500 mt-2">
            Enter OTP sent to
          </p>

          <p className="font-semibold text-cyan-700 break-all mt-1">
            {emailId}
          </p>

        </div>



        <form
          onSubmit={handleVerify}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Enter 6 Digit OTP"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
            maxLength="6"
            className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500 text-center text-2xl tracking-widest"
          />



          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-cyan-50 text-cyan-700 px-4 py-3 rounded-2xl text-sm font-medium">
              {success}
            </div>
          )}



          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-lg hover:opacity-95 transition cursor-pointer disabled:opacity-60"
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

        </form>



        <p className="text-center mt-6 text-slate-600">

          Already verified?{" "}

          <Link
            to="/login"
            className="text-cyan-600 font-semibold hover:text-blue-600"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  )
}

export default VerifyEmail