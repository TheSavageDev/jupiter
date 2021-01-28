const mongoose = require('mongoose')
const faker = require('faker')
const Credit = require('../../src/models/credit.model')

const creditOne = {
  _id: mongoose.Types.ObjectId(),
  accountId: faker.random.uuid(),
  amount: faker.finance.amount(),
  description: faker.finance.transactionDescription(),
  to: faker.name.findName(),
  date: faker.date.past(),
}

const creditTwo = {
  _id: mongoose.Types.ObjectId(),
  accountId: faker.random.uuid(),
  amount: faker.finance.amount(),
  description: faker.finance.transactionDescription(),
  to: faker.name.findName(),
  date: faker.date.past(),
}

const insertCredits = async credits => {
  await Credit.insertMany(credits.map(credit => ({ ...credit })))
}

module.exports = {
  creditOne,
  creditTwo,
  insertCredits,
}
