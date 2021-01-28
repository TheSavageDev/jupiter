const mongoose = require('mongoose')
const faker = require('faker')
const Debit = require('../../src/models/debit.model')

const debitOne = {
  _id: mongoose.Types.ObjectId(),
  accountId: faker.random.uuid(),
  amount: faker.finance.amount(),
  description: faker.finance.transactionDescription(),
  to: faker.name.findName(),
  date: faker.date.past(),
}

const debitTwo = {
  _id: mongoose.Types.ObjectId(),
  accountId: faker.random.uuid(),
  amount: faker.finance.amount(),
  description: faker.finance.transactionDescription(),
  to: faker.name.findName(),
  date: faker.date.past(),
}

const insertDebits = async debits => {
  await Debit.insertMany(debits.map(debit => ({ ...debit })))
}

module.exports = {
  debitOne,
  debitTwo,
  insertDebits,
}
