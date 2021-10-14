const express = require("express");
const router = express.Router();

const expenses = require("../controllers/expenses.controller");
const verifyToken = require("../../utils/verifyToken");
router.get("/", expenses.getAllExpenses);
router.get("/:id", expenses.getExpenses);
router.post("/:id", expenses.addExpense);
router.delete("/:userID/:expenseID", expenses.deleteExpense);
router.patch("/:id", expenses.updateExpense);

module.exports = router;
