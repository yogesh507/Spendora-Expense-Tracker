const Budget = require("../Models/budget")

// Set / Update current month budget
const saveBudget = async (req, res) => {
  try {
    const { amount } = req.body

    const now = new Date()

    const month = now.getMonth() + 1
    const year = now.getFullYear()

    const budget =
      await Budget.findOneAndUpdate(
        {
          userId: req.user._id,
          month,
          year
        },
        {
          amount
        },
        {
          new: true,
          upsert: true
        }
      )

    res.send(budget)

  } catch (err) {
    res.status(400).send(err.message)
  }
}

// Get current month budget
const getBudget = async (req, res) => {
  try {
    const now = new Date()

    const month = now.getMonth() + 1
    const year = now.getFullYear()

    const budget = await Budget.findOne({
      userId: req.user._id,
      month,
      year
    })

    res.send(budget || null)

  } catch (err) {
    res.status(400).send(err.message)
  }
}

module.exports = {
  saveBudget,
  getBudget
}