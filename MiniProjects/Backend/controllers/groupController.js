const Group = require("../Models/group")
const GroupExpense = require("../Models/groupExpense")
const Settlement = require("../Models/settlement")
const User = require("../Models/users")

// ---------------- HELPERS ----------------

const createInviteCode = () => {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
}

const isSameId = (a, b) =>
  a?.toString() === b?.toString()

// ---------------- CREATE GROUP ----------------

const createGroup = async (req, res) => {
  try {
    const group = await Group.create({
      name: req.body.name?.trim(),
      createdBy: req.user._id,
      members: [req.user._id],
      requests: [],
      inviteCode: createInviteCode()
    })

    res.status(201).json(group)
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

// ---------------- JOIN GROUP ----------------

const joinGroup = async (req, res) => {
  try {
    const { code } = req.body

    const group = await Group.findOne({
      inviteCode: code
        ?.trim()
        .toUpperCase()
    })

    if (!group) {
      throw new Error(
        "Invalid invite code"
      )
    }

    if (
      group.members.some(
        (id) =>
          isSameId(
            id,
            req.user._id
          )
      )
    ) {
      throw new Error(
        "Already a member"
      )
    }

    if (
      group.requests.some(
        (id) =>
          isSameId(
            id,
            req.user._id
          )
      )
    ) {
      throw new Error(
        "Request already sent"
      )
    }

    group.requests.push(
      req.user._id
    )

    await group.save()

    res.json({
      message:
        "Join request sent"
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

// ---------------- APPROVE REQUEST ----------------

const approveRequest = async (
  req,
  res
) => {
  try {
    const {
      groupId,
      userId
    } = req.body

    const group =
      await Group.findById(
        groupId
      )

    if (!group) {
      throw new Error(
        "Group not found"
      )
    }

    if (
      !isSameId(
        group.createdBy,
        req.user._id
      )
    ) {
      throw new Error(
        "Only admin can approve"
      )
    }

    if (
      !group.members.some(
        (id) =>
          isSameId(
            id,
            userId
          )
      )
    ) {
      group.members.push(
        userId
      )
    }

    group.requests =
      group.requests.filter(
        (id) =>
          !isSameId(
            id,
            userId
          )
      )

    await group.save()

    res.json({
      message:
        "User approved"
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

// ---------------- REJECT REQUEST ----------------

const rejectRequest = async (
  req,
  res
) => {
  try {
    const {
      groupId,
      userId
    } = req.body

    const group =
      await Group.findById(
        groupId
      )

    if (!group) {
      throw new Error(
        "Group not found"
      )
    }

    if (
      !isSameId(
        group.createdBy,
        req.user._id
      )
    ) {
      throw new Error(
        "Only admin can reject"
      )
    }

    group.requests =
      group.requests.filter(
        (id) =>
          !isSameId(
            id,
            userId
          )
      )

    await group.save()

    res.json({
      message:
        "Request rejected"
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

// ---------------- DELETE GROUP ----------------

const deleteGroup = async (
  req,
  res
) => {
  try {
    const { groupId } =
      req.params

    const group =
      await Group.findById(
        groupId
      )

    if (!group) {
      throw new Error(
        "Group not found"
      )
    }

    if (
      !isSameId(
        group.createdBy,
        req.user._id
      )
    ) {
      throw new Error(
        "Only admin can delete"
      )
    }

    await Group.findByIdAndDelete(
      groupId
    )

    await GroupExpense.deleteMany(
      { groupId }
    )

    await Settlement.deleteMany(
      { groupId }
    )

    res.json({
      message:
        "Group deleted successfully"
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

// ---------------- GET GROUPS ----------------

const getGroups = async (
  req,
  res
) => {
  try {
    const created =
      await Group.find({
        createdBy:
          req.user._id
      })
        .populate(
          "members",
          "name"
        )
        .populate(
          "requests",
          "name email"
        )

    const joined =
      await Group.find({
        members:
          req.user._id
      })
        .populate(
          "members",
          "name"
        )
        .populate(
          "requests",
          "name email"
        )

    res.json({
      created,
      joined
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

// ---------------- GET SINGLE GROUP ----------------

const getSingleGroup =
  async (req, res) => {
    try {
      const group =
        await Group.findById(
          req.params.groupId
        )
          .populate(
            "members",
            "name"
          )
          .populate(
            "requests",
            "name email"
          )

      if (!group) {
        throw new Error(
          "Group not found"
        )
      }

      res.json(group)
    } catch (err) {
      res.status(400).json({
        message:
          err.message
      })
    }
  }

// ---------------- ADD EXPENSE ----------------

const addGroupExpense =
  async (req, res) => {
    try {
      const {
        groupId,
        amount,
        splitBetween,
        description,
        paidBy,
        createdAt
      } = req.body

      const group =
        await Group.findById(
          groupId
        )

      if (!group) {
        throw new Error(
          "Group not found"
        )
      }

      const payerId =
        paidBy ||
        req.user._id

      if (
        !group.members.some(
          (id) =>
            isSameId(
              id,
              req.user._id
            )
        )
      ) {
        throw new Error(
          "Not a member"
        )
      }

      const expense =
        await GroupExpense.create(
          {
            groupId,
            amount:
              Number(
                amount
              ),
            paidBy:
              payerId,
            splitBetween,
            description,
            createdAt
          }
        )

      res.status(201).json(
        expense
      )
    } catch (err) {
      res.status(400).json({
        message:
          err.message
      })
    }
  }

// ---------------- GET EXPENSES ----------------

const getGroupExpenses =
  async (req, res) => {
    try {
      const expenses =
        await GroupExpense.find(
          {
            groupId:
              req.params
                .groupId
          }
        )
          .populate(
            "paidBy",
            "name"
          )
          .populate(
            "splitBetween",
            "name"
          )
          .sort({
            createdAt: -1
          })

      res.json(expenses)
    } catch (err) {
      res.status(400).json({
        message:
          err.message
      })
    }
  }

// ---------------- BALANCE HELPERS ----------------

const calculateNetBalance =
  (expenses) => {
    let balance = {}

    expenses.forEach(
      (exp) => {
        const split =
          exp.amount /
          exp
            .splitBetween
            .length

        const payer =
          exp.paidBy.toString()

        balance[payer] =
          (balance[
            payer
          ] || 0) +
          exp.amount

        exp.splitBetween.forEach(
          (user) => {
            const id =
              user.toString()

            balance[id] =
              (balance[
                id
              ] || 0) -
              split
          }
        )
      }
    )

    return balance
  }

const simplifyBalance =
  (balance) => {
    let creditors = []
    let debtors = []

    for (let user in balance) {
      const amt =
        Number(
          balance[
            user
          ].toFixed(2)
        )

      if (amt > 0) {
        creditors.push({
          user,
          amount: amt
        })
      }

      if (amt < 0) {
        debtors.push({
          user,
          amount: -amt
        })
      }
    }

    let result = []

    for (let d of debtors) {
      for (let c of creditors) {
        if (
          d.amount <= 0
        )
          break

        if (
          c.amount <= 0
        )
          continue

        const pay =
          Math.min(
            d.amount,
            c.amount
          )

        result.push({
          from: d.user,
          to: c.user,
          amount:
            Number(
              pay.toFixed(
                2
              )
            )
        })

        d.amount -= pay
        c.amount -= pay
      }
    }

    return result
  }

// ---------------- GET BALANCE ----------------

const getGroupBalance =
  async (req, res) => {
    try {
      const {
        groupId
      } = req.params

      const expenses =
        await GroupExpense.find(
          { groupId }
        )

      let balance =
        calculateNetBalance(
          expenses
        )

      const settlements =
        await Settlement.find(
          { groupId }
        )

      settlements.forEach(
        (s) => {
          balance[s.from] =
            (balance[
              s.from
            ] || 0) +
            s.amount

          balance[s.to] =
            (balance[
              s.to
            ] || 0) -
            s.amount
        }
      )

      const final =
        simplifyBalance(
          balance
        )

      for (let item of final) {
        const fromUser =
          await User.findById(
            item.from
          )

        const toUser =
          await User.findById(
            item.to
          )

        item.fromName =
          fromUser?.name

        item.toName =
          toUser?.name
      }

      res.json(final)
    } catch (err) {
      res.status(400).json({
        message:
          err.message
      })
    }
  }

// ---------------- SETTLE PAYMENT ----------------

const settlePayment =
  async (req, res) => {
    try {
      const {
        groupId,
        to,
        amount
      } = req.body

      const from =
        req.user._id

      const expenses =
        await GroupExpense.find(
          { groupId }
        )

      let balance =
        calculateNetBalance(
          expenses
        )

      const settlements =
        await Settlement.find(
          { groupId }
        )

      settlements.forEach(
        (s) => {
          balance[s.from] =
            (balance[
              s.from
            ] || 0) +
            s.amount

          balance[s.to] =
            (balance[
              s.to
            ] || 0) -
            s.amount
        }
      )

      const final =
        simplifyBalance(
          balance
        )

      const allowed =
        final.find(
          (item) =>
            isSameId(
              item.from,
              from
            ) &&
            isSameId(
              item.to,
              to
            )
        )

      if (!allowed) {
        throw new Error(
          "Not allowed"
        )
      }

      await Settlement.create(
        {
          groupId,
          from,
          to,
          amount:
            Number(
              amount
            )
        }
      )

      res.json({
        message:
          "Payment settled"
      })
    } catch (err) {
      res.status(400).json({
        message:
          err.message
      })
    }
  }

// ---------------- HISTORY ----------------

const getSettlementHistory =
  async (req, res) => {
    try {
      const data =
        await Settlement.find(
          {
            groupId:
              req.params
                .groupId
          }
        )
          .populate(
            "from",
            "name"
          )
          .populate(
            "to",
            "name"
          )
          .sort({
            createdAt: -1
          })

      res.json(data)
    } catch (err) {
      res.status(400).json({
        message:
          err.message
      })
    }
  }

module.exports = {
  createGroup,
  joinGroup,
  approveRequest,
  rejectRequest,
  deleteGroup,
  getGroups,
  getSingleGroup,
  addGroupExpense,
  getGroupExpenses,
  getGroupBalance,
  settlePayment,
  getSettlementHistory
}