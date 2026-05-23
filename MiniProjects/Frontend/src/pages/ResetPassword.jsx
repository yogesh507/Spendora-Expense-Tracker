import { useState } from "react"
import {
  useNavigate,
  useParams
} from "react-router-dom"

import api from "../api/axios"

function ResetPassword() {

  const navigate =
    useNavigate()

  const { token } =
    useParams()

  const [password, setPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [error, setError] =
    useState("")

  const [success, setSuccess] =
    useState("")

  const [loading, setLoading] =
    useState(false)



  const handleSubmit =
    async (e) => {

      e.preventDefault()

      if (!password || !confirmPassword) {
        setError(
          "All fields are required"
        )
        return
      }

      if (password !== confirmPassword) {
        setError(
          "Passwords do not match"
        )
        return
      }

      try {

        setLoading(true)
        setError("")
        setSuccess("")

        const res =
          await api.post(
            `/reset-password/${token}`,
            { password }
          )

        setSuccess(
          res.data.message
        )

        setTimeout(() => {
          navigate("/login")
        }, 1500)

      } catch (err) {

        const msg =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Reset failed"

        setError(msg)

      } finally {

        setLoading(false)
      }
}



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Spendora
          </h1>

          <h2 className="text-3xl font-bold text-slate-900">
            Reset Password
          </h2>

        </div>



        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }
            className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500"
          />



          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-cyan-50 text-cyan-700 px-4 py-3 rounded-2xl text-sm">
              {success}
            </div>
          )}



          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>

        </form>

      </div>
    </div>
  )
}

export default ResetPassword