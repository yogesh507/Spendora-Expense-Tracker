const express = require("express")
const router = express.Router()

const auth = require("../middleware/userAuth")

const {
  saveBudget,
  getBudget
} = require("../controllers/budgetController")

router.post("/budget", auth, saveBudget)
router.get("/budget", auth, getBudget)

module.exports = router