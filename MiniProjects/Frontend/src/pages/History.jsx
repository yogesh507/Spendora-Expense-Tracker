// src/pages/History.jsx
// Spendora Theme + Production Level UI
// SAME LOGIC preserved :contentReference[oaicite:0]{index=0}

import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"
import EditTransactionModal from "../components/EditTransactionModal"

function History() {
  const [transactions, setTransactions] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [filterType, setFilterType] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const expenseRes = await api.get("/api/expense")
      const incomeRes = await api.get("/api/income")

      const expenses = expenseRes.data.map((item) => ({
        ...item,
        type: "expense"
      }))

      const incomes = incomeRes.data.map((item) => ({
        ...item,
        type: "income"
      }))

      const all = [...expenses, ...incomes]

    all.sort(
 (a,b)=>
   new Date(b.date || b.createdAt) -
   new Date(a.date || a.createdAt)
)

      setTransactions(all)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (item) => {
    try {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete?"
        )

      if (!confirmDelete) return

      if (item.type === "expense") {
        await api.delete(
          `/api/expense/${item._id}`
        )
      } else {
        await api.delete(
          `/api/income/${item._id}`
        )
      }

      fetchHistory()
    } catch (err) {
      console.log(err)
      alert("Delete failed")
    }
  }

  const filteredTransactions =
    transactions.filter((item) => {
      const matchesType =
        filterType === "all" ||
        item.type === filterType

      const text =
        `${
          item.category || ""
        } ${
          item.description || ""
        }`.toLowerCase()

      const matchesSearch =
        text.includes(
          search.toLowerCase()
        )

      return (
        matchesType &&
        matchesSearch
      )
    })

  const filterBtn = (
    type,
    label
  ) =>
    filterType === type
      ? "px-5 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow"
      : "px-5 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-[1800px] mx-auto px-24 md:px-32 lg:px-36 py-8">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-5xl font-bold text-slate-900">
            History
          </h1>

          <p className="text-slate-500 text-lg mt-2">
            Track every transaction
          </p>

        </div>

        {/* Filters */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-8 ">

          <div className="flex flex-wrap gap-3 ">

            <button
              onClick={() =>
                setFilterType("all")
              }
              className={filterBtn(
                "all",
                "All"
              )}
            >
              All
            </button>

            <button
              onClick={() =>
                setFilterType(
                  "income"
                )
              }
              className={filterBtn(
                "income",
                "Income"
              )}
            >
              Income
            </button>

            <button
              onClick={() =>
                setFilterType(
                  "expense"
                )
              }
              className={filterBtn(
                "expense",
                "Expense"
              )}
            >
              Expense
            </button>

          </div>

          <input
            type="text"
            placeholder="Search category or description..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full xl:w-96 px-5 py-3 rounded-2xl border border-slate-200 bg-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">

          <table className="w-full min-w-[1250px]">

            <thead className="bg-slate-50 border-b border-slate-200">

              <tr className="text-left text-slate-500 text-sm">

                <th className="px-6 py-5">
                  Date
                </th>

                <th className="px-6 py-5">
                  Amount
                </th>

                <th className="px-6 py-5">
                  Category
                </th>

                <th className="px-6 py-5">
                  Description
                </th>

                <th className="px-6 py-5">
                  Type
                </th>

                <th className="px-6 py-5">
                  Edit
                </th>

                <th className="px-6 py-5">
                  Delete
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTransactions.length >
              0 ? (
                filteredTransactions.map(
                  (
                    item
                  ) => (
                    <tr
                      key={
                        item._id
                      }
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                      <td className="px-6 py-5 text-slate-700">
                        {new Date(
  item.date || item.createdAt
).toLocaleDateString(
  "en-GB",
  {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }
)}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            item.type ===
                            "income"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          ₹ {item.amount}
                        </span>

                      </td>

                      <td className="px-6 py-5 text-slate-800 font-medium">
                        {item.category ||
                          "Income"}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {item.description ||
                          "--"}
                      </td>

                      <td className="px-6 py-5 capitalize">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.type ===
                            "income"
                              ? "bg-cyan-100 text-cyan-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {
                            item.type
                          }
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <button
                          onClick={() =>
                            setSelectedItem(
                              item
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>

                      </td>

                      <td className="px-6 py-5">

                        <button
                          onClick={() =>
                            handleDelete(
                              item
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-12 text-slate-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {selectedItem && (
        <EditTransactionModal
          item={selectedItem}
          closeModal={() =>
            setSelectedItem(null)
          }
          refreshData={fetchHistory}
        />
      )}

    </div>
  )
}

export default History