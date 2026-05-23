import { useState } from "react"
import api from "../api/axios"

function EditTransactionModal({
  item,
  closeModal,
  refreshData
}) {
  const [description, setDescription] = useState(
    item.description || ""
  )

  const [amount, setAmount] = useState(item.amount)

  const [category, setCategory] = useState(
    item.category || "Other"
  )

 const formatDate = (value) => {
  const d = new Date(value)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const [date, setDate] = useState(
  item.date ? formatDate(item.date) : ""
)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (item.type === "expense") {
        await api.patch(`/api/expense/${item._id}`, {
          amount,
          category,
          description,
          date
        })
      } else {
        await api.patch(`/api/income/${item._id}`, {
          amount,
          description,
          date
        })
      }

      setSuccess("Updated Successfully")

      setTimeout(() => {
        refreshData()
        closeModal()
      }, 700)

    } catch (err) {
      setError("Update failed")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      <div className="bg-white w-full max-w-xl rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Edit{" "}
           
            Transaction
          </h2>

          <button
            onClick={closeModal}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ✕
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Description */}
          <div>
            <label className="block mb-2 text-xl">
              Description (Optional)
            </label>

            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-2 text-xl">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Category */}
          {item.type === "expense" && (
            <div>
              <label className="block mb-2 text-xl">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Health</option>
                <option>Other</option>
              </select>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block mb-2 text-xl">
              Transaction Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="text-green-600 text-sm">
              {success}
            </p>
          )}

          {/* Button */}
          <div className="flex justify-end">

            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
            >
              Update Expense
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default EditTransactionModal