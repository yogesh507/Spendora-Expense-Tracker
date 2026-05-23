// src/pages/GroupDetails.jsx
// Spendora Theme + Production Level + Same Logic + 1800px Width

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"
import Navbar from "../components/Navbar"

function GroupDetails() {
  const { groupId } = useParams()
  const navigate = useNavigate()

  const [expenses, setExpenses] = useState([])
  const [balances, setBalances] = useState([])
  const [members, setMembers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [loading, setLoading] = useState(true)

  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [paidBy, setPaidBy] = useState("")
  const [selectedMembers, setSelectedMembers] = useState([])

  const [userId, setUserId] = useState("")
  const [settlements, setSettlements] = useState([])

  const [expenseDate, setExpenseDate] = useState(
    new Date()
      .toISOString()
      .split("T")[0]
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      const [
        expenseRes,
        balanceRes,
        groupRes,
        userRes,
        settlementRes
      ] = await Promise.all([
        api.get(`/api/group/${groupId}/expenses`),
        api.get(`/api/group/${groupId}/balance`),
        api.get(`/api/group/${groupId}`),
        api.get("/me"),
        api.get(`/api/group/${groupId}/settlements`)
      ])

 setExpenses(
  [...expenseRes.data].sort(
    (a, b) =>
      b._id.localeCompare(a._id)
  )
)
      setBalances(balanceRes.data)
      setSettlements(settlementRes.data)
      setUserId(userRes.data._id)

      const group = groupRes.data

      setMembers(group.members || [])

      setSelectedMembers(
        (group.members || []).map(
          (item) => item._id
        )
      )

      if (group.members?.length > 0) {
        setPaidBy(group.members[0]._id)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleMember = (id) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(
        selectedMembers.filter(
          (item) => item !== id
        )
      )
    } else {
      setSelectedMembers([
        ...selectedMembers,
        id
      ])
    }
  }

  const handleAddExpense = async (e) => {
    e.preventDefault()

     if (!description.trim()) {
    alert("Please enter description")
    return
  }

    try {
  
      await api.post(
        "/api/group/addGroupExpense",
        {
          groupId,
          amount,
          description,
          paidBy,
          createdAt: expenseDate,
          splitBetween:
            selectedMembers
        }
      )

      setAmount("")
      setDescription("")
      setShowModal(false)

      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const handleSettle = async (
    to,
    amount
  ) => {
    try {
      await api.post(
        "/api/group/settle",
        {
          groupId,
          to,
          amount
        }
      )

      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteGroup = async () => {
    const ok = window.confirm(
      "Delete this group permanently?"
    )

    if (!ok) return

    try {
      await api.delete(
        `/api/group/${groupId}`
      )

      navigate("/groups")
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="max-w-[1800px] mx-auto px-24 md:px-32 lg:px-36 py-10 text-xl font-semibold text-slate-600">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-[1800px] mx-auto px-24 md:px-32 lg:px-36 py-8">

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-10">

          <div>
            <h1 className="text-5xl font-bold text-slate-900">
              Group Details
            </h1>

            <p className="text-slate-500 text-lg mt-2">
              Manage shared expenses smartly
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() =>
                setShowHistory(true)
              }
              className="px-5 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              Settle History
            </button>

            <button
              onClick={handleDeleteGroup}
              className="px-5 py-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            >
              Delete Group
            </button>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow cursor-pointer"
            >
              + Add Expense
            </button>

          </div>

        </div>

        {/* Main */}
        <div className="grid xl:grid-cols-3 gap-7">

          {/* Transactions */}
          <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

            <h2 className="text-3xl font-bold mb-7">
              Transactions
            </h2>

            <div className="space-y-4">

              {expenses.length === 0 && (
                <p className="text-slate-400">
                  No expenses yet
                </p>
              )}

              {expenses.map((item) => (
                <div
                  key={item._id}
                  className="grid md:grid-cols-4 gap-4 border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition"
                >

                  <div>
                    <p className="text-sm text-slate-500">
                      Date
                    </p>

                    <p className="font-medium">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Description
                    </p>

                    <p className="font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Paid By
                    </p>

                    <p className="font-medium">
                      {item.paidBy?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Amount
                    </p>

                    <p className="font-bold text-red-500 text-lg">
                      ₹{item.amount}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Balances */}
         <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 self-start">

            <h2 className="text-3xl font-bold mb-7">
              Who Owes Whom
            </h2>

            <div className="space-y-4">

              {balances.length === 0 && (
                <p className="text-slate-400">
                  All settled 🎉
                </p>
              )}

              {balances.map(
                (item, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl p-5"
                  >

                    <p className="font-semibold text-slate-900">
                      {item.fromName}
                    </p>

                    <p className="text-red-500 mt-1">
                      Pays ₹{item.amount}
                    </p>

                    <p className="font-semibold text-slate-900 mt-4">
                      {item.toName}
                    </p>

                    <p className="text-green-600 mt-1">
                      Receives ₹{item.amount}
                    </p>

                    {String(
                      item.from
                    ) ===
                      String(
                        userId
                      ) && (
                      <button
                        onClick={() =>
                          handleSettle(
                            item.to,
                            item.amount
                          )
                        }
                        className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold cursor-pointer"
                      >
                        Settle Up
                      </button>
                    )}

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl p-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-4xl font-bold text-slate-900">
                Add Expense
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-3xl cursor-pointer"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={
                handleAddExpense
              }
              className="space-y-5"
            >

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                className="w-full border border-slate-300 px-5 py-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full border border-slate-300 px-5 py-4 rounded-2xl"
              />

              <div className="grid md:grid-cols-2 gap-4">

                <select
                  value={paidBy}
                  onChange={(e) =>
                    setPaidBy(
                      e.target.value
                    )
                  }
                  className="border border-slate-300 px-5 py-4 rounded-2xl cursor-pointer"
                >
                  {members.map(
                    (member) => (
                      <option
                        key={
                          member._id
                        }
                        value={
                          member._id
                        }
                      >
                        {
                          member.name
                        }
                      </option>
                    )
                  )}
                </select>

                <input
                  type="date"
                  value={
                    expenseDate
                  }
                  onChange={(e) =>
                    setExpenseDate(
                      e.target.value
                    )
                  }
                  className="border border-slate-300 px-5 py-4 rounded-2xl cursor-pointer"
                />

              </div>

              <div className="space-y-3">

                {members.map(
                  (member) => {
                    const checked =
                      selectedMembers.includes(
                        member._id
                      )

                    return (
                      <div
                        key={
                          member._id
                        }
                        className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-2xl"
                      >

                        <label className="flex gap-3 items-center cursor-pointer">

                          <input
                            type="checkbox"
                            checked={
                              checked
                            }
                            onChange={() =>
                              toggleMember(
                                member._id
                              )
                            }
                            className="cursor-pointer"
                          />

                          {
                            member.name
                          }

                        </label>

                        <span className="font-semibold text-slate-700">
                          ₹
                          {checked
                            ? (
                                Number(
                                  amount ||
                                    0
                                ) /
                                selectedMembers.length
                              ).toFixed(
                                2
                              )
                            : "0.00"}
                        </span>

                      </div>
                    )
                  }
                )}

              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold cursor-pointer"
              >
                Add Expense
              </button>

            </form>

          </div>

        </div>
      )}

      {/* Settlement History */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                Settlement History
              </h2>

              <button
                onClick={() =>
                  setShowHistory(false)
                }
                className="text-3xl cursor-pointer"
              >
                ✕
              </button>

            </div>

            <div className="space-y-4">

              {settlements.length === 0 && (
                <p className="text-slate-400">
                  No settlements yet
                </p>
              )}

              {settlements.map(
                (item) => (
                  <div
                    key={item._id}
                    className="border border-slate-200 rounded-2xl p-5"
                  >

                    <p className="font-semibold">
                      {item.from?.name} paid{" "}
                      {item.to?.name}
                    </p>

                    <p className="text-green-600 font-bold text-lg mt-2">
                      ₹{item.amount}
                    </p>

                    <p className="text-sm text-slate-500 mt-2">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default GroupDetails