// src/components/AddExpenseModal.jsx
// FINAL Spendora Brand Version + Same Logic

import { useState } from "react"
import api from "../api/axios"

function AddExpenseModal({
  closeModal,
  refreshData
}) {
  const today =
    new Date().toLocaleDateString(
      "en-CA"
    )

  const [amount, setAmount] =
    useState("")
  const [category, setCategory] =
    useState("")
  const [description, setDescription] =
    useState("")
  const [date, setDate] =
    useState(today)
  const [error, setError] =
    useState("")
  const [success, setSuccess] =
    useState("")
  const [loading, setLoading] =
    useState(false)

  const handleSubmit =
    async (e) => {
      e.preventDefault()

      setError("")
      setSuccess("")

      if (!amount || !category) {
        setError(
          "Please fill all required details"
        )
        return
      }

      try {
        setLoading(true)

        await api.post(
          "/api/expense",
          {
            amount,
            category,
            description,
            date
          }
        )

        setSuccess(
          "Expense added successfully"
        )

        setTimeout(() => {
          refreshData()
          closeModal()
        }, 900)
      } catch (err) {
        setError(
          err.response?.data ||
            "Failed to add expense"
        )
      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              Add{" "}
              <span className="text-cyan-500">
                Expense
              </span>
            </h2>

            <p className="text-slate-500 mt-2">
              Track every spending smartly
            </p>
          </div>

          <button
            onClick={closeModal}
            className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-2xl text-slate-600 cursor-pointer"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500 cursor-pointer bg-white"
          >
            <option
              value=""
              disabled
            >
              Select Category
            </option>

            <option>
              Food
            </option>
            <option>
              Travel
            </option>
            <option>
              Shopping
            </option>
            <option>
              Bills
            </option>
            <option>
              Health
            </option>
            <option>
              Other
            </option>

          </select>

          <input
            type="text"
            placeholder="Description (optional)"
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500 cursor-pointer"
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
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow hover:opacity-95 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Adding..."
              : "Add Expense"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddExpenseModal