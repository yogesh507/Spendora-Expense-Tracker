const express = require("express")
const router = express.Router()
const auth = require("../middleware/userAuth")

const {createGroup,joinGroup,approveRequest,deleteGroup ,getGroups, addGroupExpense, getGroupExpenses,getGroupBalance,settlePayment,getSettlementHistory,getSingleGroup,
rejectRequest} = require("../controllers/groupController")

router.post("/group",auth,createGroup)
router.post("/group/join",auth,joinGroup)
router.post("/group/approve",auth,approveRequest)
router.delete("/group/:groupId",auth,deleteGroup)
router.get("/group/info",auth,getGroups)

//group expense
router.post("/group/addGroupExpense",auth,addGroupExpense)
router.get("/group/:groupId/expenses",auth,getGroupExpenses)

//
router.get("/group/:groupId/balance",auth,getGroupBalance)

//settle
router.post("/group/settle",auth,settlePayment)
//settlementhistory
router.get("/group/:groupId/settlements",auth,getSettlementHistory)

router.get("/group/:groupId", auth, getSingleGroup)
router.post("/group/reject", auth, rejectRequest)
module.exports = router;