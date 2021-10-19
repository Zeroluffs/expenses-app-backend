const User = require("../models/User");
const Expense = require("../models/Expense");

const expenseCtrl = {};

expenseCtrl.addExpense = async (req, res) => {
  const newExpense = new Expense({
    name: req.body.name,
    cost: req.body.cost,
    type: req.body.type,
    id: req.params.id,
  });
  await newExpense.save();
  await User.findByIdAndUpdate(
    req.params.id,
    { $push: { expenses: newExpense } },
    { new: true, useFindAndModify: false }
  );
  await User.findById(req.params.id).populate("expenses");
  res.send(newExpense);
};
expenseCtrl.getAllExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
};

expenseCtrl.getExpenses = async (req, res) => {
  const watcher = await User.findById(req.params.id).populate("expenses");
  expenses = await watcher.expenses;
  response = [];
  for (let index = 0; index < expenses.length; index++) {
    const element = {
      id: index,
      name: expenses[index].name,
      cost:  expenses[index].cost,
      userID: req.params.id,
      _id:  expenses[index]._id,
    };
    response[index] = element;
  }
  res.json(response);
};

expenseCtrl.updateExpense = async (req, res) => {
  const expense = {
    name: req.body.name,
    cost: req.body.cost,
    type: req.body.type,
  };
  await Expense.findByIdAndUpdate(
    req.params.expenseID,
    { $set: expense },
    { new: true }
  );
  res.json({
    status: "Expense Updated",
  });
};

expenseCtrl.deleteExpense = async (req, res) => {
  await Expense.findByIdAndRemove(req.params.expenseID);
  await User.findByIdAndUpdate(
    req.params.userID,
    { $pull: { expenses: req.params.expenseID } },
    { new: true }
  );
  res.send("expense deleted");
};

module.exports = expenseCtrl;
