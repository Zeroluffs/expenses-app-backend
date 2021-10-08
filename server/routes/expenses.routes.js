const express = require("express");
const router = express.Router();

const expenses = require("../controllers/expenses.controller");
const verifyToken = require("../../utils/verifyToken");

router.get("/:id", expenses.getExpenses);
router.post("/:id", verifyToken, expenses.addExpense);
router.delete("/:userID/:expenseID", verifyToken, expenses.deleteExpense);
router.patch("/:id", verifyToken, expenses.updateExpense);

module.exports = router;
