// src/pages/Settings.jsx
// Spendora Clean Settings Page (Dark Mode Removed)

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import api from "../api/axios"

function Settings() {
  const [name, setName] =
    useState("")

  const [emailId, setEmailId] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [message, setMessage] =
    useState("")

  useEffect(() => {
    const fetchUser =
      async () => {
        try {
          const res =
            await api.get("/me")

          setName(
            res.data.name
          )

          setEmailId(
            res.data.emailId
          )

        } catch (err) {
          console.log(err)
        }
      }

    fetchUser()
  }, [])

  const handleSave =
    async () => {
      try {
        setLoading(true)
        setMessage("")

        await api.patch(
          "/update-profile",
          {
            name
          }
        )

        setMessage(
          "Profile updated successfully"
        )

      } catch (err) {
        setMessage(
          "Update failed"
        )

      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <h1 className="text-4xl font-bold text-slate-900">
            Settings
          </h1>

          <button
            onClick={
              handleSave
            }
            disabled={
              loading
            }
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md hover:opacity-95 transition cursor-pointer"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">

          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Personal Information
          </h2>

          {/* Name */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full px-5 py-4 rounded-xl border border-slate-300 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="text"
              value={emailId}
              readOnly
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500"
            />

          </div>

        </div>

        {/* Message */}
        {message && (
          <p className="mt-6 text-sm font-medium text-cyan-600">
            {message}
          </p>
        )}

      </div>

    </div>
  )
}

export default Settings