const express = require("express")
const router = express.Router()
const auth = require("../middleware/userAuth")



const {addIncome,getIncome,deleteIncome,updateIncome} = require("../controllers/incomeController")

// add income
router.post("/income",auth,addIncome)

// get income history
router.get("/income",auth,getIncome)
router.patch("/income/:id", auth, updateIncome)
router.delete("/income/:id", auth, deleteIncome)

module.exports = router;