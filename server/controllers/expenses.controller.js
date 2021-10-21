const User = require("../models/User");
const Expense = require("../models/Expense");
const Counter = require("../models/Counter");

const expenseCtrl = {};

expenseCtrl.addExpense = async (req, res) => {
  var count = await Counter.find();
  if (count.length == 0) {
    const newCount = new Counter({
      _id: "expenses",
    });
    await newCount.save();
  } else {
    var count = await Counter.findByIdAndUpdate(
      "expenses",
      { $inc: { count: 1 } },
      { new: true, useFindAndModify: false }
    );
    const newExpense = new Expense({
      id: count.count,
      name: req.body.name,
      cost: req.body.cost,
      type: req.body.type,
      userID: req.params.id,
    });
    await newExpense.save();
    await User.findByIdAndUpdate(
      req.params.id,
      { $push: { expenses: newExpense } },
      { new: true, useFindAndModify: false }
    );
    await User.findById(req.params.id).populate("expenses");
    res.send(newExpense);
  }
};
expenseCtrl.getAllExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
};

expenseCtrl.getExpenses = async (req, res) => {
  const watcher = await User.findById(req.params.id).populate("expenses");
  var expenses = await watcher.expenses;
  // response = [];
  // for (let index = 0; index < expenses.length; index++) {
  //   const element = {
  //     id: index,
  //     name: expenses[index].name,
  //     cost: expenses[index].cost,
  //     userID: req.params.id,
  //     _id: expenses[index]._id,
  //   };
  //   response[index] = element;
  // }
  res.json(expenses);
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
