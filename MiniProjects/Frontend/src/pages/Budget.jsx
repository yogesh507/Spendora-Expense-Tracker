import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

import Toast from "../components/Toast"


function Budget() {
  const [budget, setBudget] = useState(null)
  const [amount, setAmount] = useState("")
  const [spent, setSpent] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [barData, setBarData] = useState([])
  const [pieData, setPieData] = useState([])
  const [aiData, setAiData] = useState(null)
  const [toast, setToast] =useState(null)

  useEffect(() => {
    fetchBudget()
  }, [])

  const fetchBudget = async () => {
    try {
      const [budgetRes, expenseRes] =
        await Promise.all([
          api.get("/api/budget"),
          api.get("/api/expense")
        ])

      setBudget(budgetRes.data)

      const now = new Date()
      const month = now.getMonth()
      const year =
        now.getFullYear()

      const totalBudget =
        Number(
          budgetRes.data
            ?.amount || 0
        )

      const monthlySpent =
        expenseRes.data
          .filter((item) => {
            const d =
              new Date(
                item.date
              )

            return (
              d.getMonth() ===
                month &&
              d.getFullYear() ===
                year
            )
          })
          .reduce(
            (sum, item) =>
              sum +
              Number(
                item.amount
              ),
            0
          )

      setSpent(
        monthlySpent
      )

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]

      const monthlyMap =
        Array(12).fill(0)

      const categoryMap = {}

      expenseRes.data.forEach(
        (item) => {
          const d =
            new Date(
              item.date
            )

          const m =
            d.getMonth()

          const y =
            d.getFullYear()

          if (y === year) {
            monthlyMap[m] +=
              Number(
                item.amount
              )
          }

          if (
            m === month &&
            y === year
          ) {
            const cat =
              item.category ||
              "Other"

            categoryMap[
              cat
            ] =
              (categoryMap[
                cat
              ] || 0) +
              Number(
                item.amount
              )
          }
        }
      )

      setBarData(
        months.map(
          (
            name,
            i
          ) => ({
            month: name,
            spend:
              monthlyMap[
                i
              ]
          })
        )
      )

      setPieData(
        Object.keys(
          categoryMap
        ).map((key) => ({
          name: key,
          value:
            categoryMap[
              key
            ]
        }))
      )

      const topCategory =
        Object.keys(
          categoryMap
        ).length > 0
          ? Object.entries(
              categoryMap
            ).sort(
              (
                a,
                b
              ) =>
                b[1] -
                a[1]
            )[0][0]
          : "No Data"

      const predicted =
        Math.round(
          monthlySpent *
            1.1
        )

      const saveSuggestion =
        topCategory !==
        "No Data"
          ? Math.round(
              categoryMap[
                topCategory
              ] * 0.15
            )
          : 0

      const usage =
        totalBudget > 0
          ? (monthlySpent /
              totalBudget) *
            100
          : 0

      let score = 95

      if (usage > 100)
        score = 60
      else if (
        usage > 80
      )
        score = 75

      const daysLeft =
        new Date(
          year,
          month + 1,
          0
        ).getDate() -
        now.getDate()

      const safeDaily =
        daysLeft > 0
          ? Math.round(
              Math.max(
                totalBudget -
                  monthlySpent,
                0
              ) /
                daysLeft
            )
          : 0

      setAiData({
        predicted,
        topCategory,
        saveSuggestion,
        score,
        safeDaily
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSave =
    async (e) => {
      e.preventDefault()

      try {
        await api.post(
          "/api/budget",
          {
            amount
          }
        )

        setAmount("")
        setShowModal(
          false
        )

        fetchBudget()
      } catch (err) {
        console.log(err)
      }
    }

 const handleReset = () => {
  const ok = window.confirm(
    "Are you sure you want to reset budget data?"
  )

  if (!ok) return

  setSpent(0)
  setPieData([])
  setAiData(null)
}

  const totalBudget =
    budget?.amount || 0

  const remaining =
    totalBudget - spent
    useEffect(() => {
  if (
    totalBudget > 0 &&
    remaining < 0
  ) {
    setToast({
      message:
        "Warning: Budget Exceeded!",
      type: "error"
    })

    setTimeout(() => {
      setToast(null)
    }, 3000)
  }
}, [remaining])

  const colors = [
    "#5B4BDB",
    "#10B981",
    "#F97316",
    "#EC4899",
    "#3B82F6",
    "#6B7280"
  ]

  const currentMonth =
    new Date().toLocaleString(
      "default",
      {
        month: "long"
      }
    )

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-[1800px] mx-auto px-24 md:px-32 lg:px-36 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-5xl font-bold">
            Budget
          </h1>

          <button
            onClick={
              handleReset
            }
            className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 cursor-pointer"
          >
            Reset
          </button>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div
            onClick={() =>
              setShowModal(
                true
              )
            }
            className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-gray-500">
              Monthly Budget
            </h2>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              ₹
              {totalBudget}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Spent This Month
            </h2>

            <p className="text-3xl font-bold text-red-500 mt-2">
              ₹
              {spent}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Remaining
            </h2>

            <p className={`text-3xl font-bold mt-2 ${
              remaining >= 0
                ? "text-green-600"
                : "text-red-500"
            }`}>
              ₹
              {remaining}
            </p>

          </div>

        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Bar */}
          <div className="bg-white rounded-2xl shadow p-6 h-96">

            <h2 className="text-2xl font-bold mb-4">
              Monthly Spend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart
                data={barData}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="spend"
                  fill="#F97316"
                  radius={[
                    8,
                    8,
                    0,
                    0
                  ]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* Pie */}
          <div className="bg-zinc-900 text-white rounded-2xl shadow p-6 h-96">

            <h2 className="text-2xl font-bold mb-4">
              {
                currentMonth
              }{" "}
              Spending
            </h2>

            {pieData.length ===
            0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-xl">
                No Spending This Month
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 h-[85%]">

                <ResponsiveContainer
                  width="100%"
                  height={280}
                >
                  <PieChart>

                    <Pie
                      data={
                        pieData
                      }
                      dataKey="value"
                      innerRadius={
                        55
                      }
                      outerRadius={
                        90
                      }
                      paddingAngle={
                        2
                      }
                      stroke="none"
                    >

                      {pieData.map(
                        (
                          item,
                          index
                        ) => (
                          <Cell
                            key={
                              index
                            }
                            fill={
                              colors[
                                index %
                                  colors.length
                              ]
                            }
                          />
                        )
                      )}

                    </Pie>

                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3 overflow-y-auto pr-2">

                  {pieData.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="flex justify-between border-b border-zinc-700 pb-2 text-sm"
                      >

                        <div className="flex items-center gap-2">

                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                colors[
                                  index %
                                    colors.length
                                ]
                            }}
                          />

                          {
                            item.name
                          }

                        </div>

                        <span>
                          ₹
                          {
                            item.value
                          }
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          </div>

        </div>

        {/* Premium AI */}
        {aiData && (
          <div className="mt-10 bg-zinc-900 text-white rounded-3xl shadow-2xl p-8">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

              <div>
                <h2 className="text-3xl font-bold">
                  AI Smart Insights
                </h2>

                <p className="text-zinc-400 mt-2">
                  Your spending behavior analyzed
                </p>
              </div>

              <div className="bg-white/10 px-4 py-2 rounded-2xl text-sm">
                Updated this month
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">
                  📈 Predicted Next Month
                </p>
                <p className="text-3xl font-bold text-blue-400 mt-3">
                  ₹
                  {aiData.predicted}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">
                  🔥 Highest Category
                </p>
                <p className="text-3xl font-bold text-red-400 mt-3">
                  {
                    aiData.topCategory
                  }
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">
                  💰 Save Potential
                </p>
                <p className="text-3xl font-bold text-green-400 mt-3">
                  ₹
                  {
                    aiData.saveSuggestion
                  }
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">
                  ⭐ Health Score
                </p>

                <p className="text-3xl font-bold text-purple-400 mt-3">
                  {
                    aiData.score
                  }
                  /100
                </p>

                <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-purple-400"
                    style={{
                      width: `${aiData.score}%`
                    }}
                  ></div>
                </div>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">
                  📅 Safe Daily Spend
                </p>

                <p className="text-3xl font-bold text-orange-400 mt-3">
                  {aiData.safeDaily >
                  0
                    ? `₹${aiData.safeDaily}`
                    : "Exceeded"}
                </p>

              </div>

              <div className="bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-300 text-sm">
                  🧠 Smart Advice
                </p>

                <p className="text-lg font-semibold mt-3 leading-relaxed">
                  {aiData.safeDaily >
                  0
                    ? `Reduce ${aiData.topCategory} spending to improve savings.`
                    : `You crossed budget. Cut ${aiData.topCategory} spending immediately.`}
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-xl rounded-2xl p-8 shadow-2xl">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">
                Set New{" "}
                <span className="text-black-500">
                  Budget
                </span>
              </h2>

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                className="text-2xl text-gray-500"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={
                handleSave
              }
              className="space-y-6"
            >

              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                placeholder="Budget Amount"
                className="w-full border rounded-xl px-4 py-3"
              />

              <button
                type="submit"
               className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
              >
                Update Budget
              </button>

            </form>

          </div>
        </div>
  )}
 
 {toast && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={() =>
      setToast(null)
    }
  />
)}
   
    </div>
  )
}

export default Budget