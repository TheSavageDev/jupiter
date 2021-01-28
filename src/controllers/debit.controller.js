const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { debitService } = require('../services')
const pick = require('../utils/pick')

const createDebit = catchAsync(async (req, res) => {
  const debit = await debitService.createDebit(req.body)
  res.status(httpStatus.CREATED).send(debit)
})

const getDebits = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['to', 'amount', 'date'])
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const debits = await debitService.queryDebits(filter, options)
  res.send(debits)
})

const getDebitById = catchAsync(async (req, res) => {
  const { debitId } = req.params
  const debit = await debitService.getDebitById(debitId)
  if (!debit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Debit not found')
  }
  res.send(debit)
})

const updateDebit = catchAsync(async (req, res) => {
  const debit = await debitService.updateDebitById(req.params.debitId, req.body)
  res.send(debit)
})

const deleteDebit = catchAsync(async (req, res) => {
  await debitService.deleteDebitById(req.params.debitId)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  createDebit,
  getDebits,
  getDebitById,
  updateDebit,
  deleteDebit,
}
