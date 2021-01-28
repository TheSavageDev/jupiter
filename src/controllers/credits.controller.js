const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { creditService } = require('../services')
const pick = require('../utils/pick')

const createCredit = catchAsync(async (req, res) => {
  const credit = await creditService.createCredit(req.body)
  res.status(httpStatus.CREATED).send(credit)
})

const getCredits = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['from', 'amount', 'date'])
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const credits = await creditService.queryCredits(filter, options)
  res.send(credits)
})

const getCreditById = catchAsync(async (req, res) => {
  const { creditId } = req.params
  const credit = await creditService.getCreditById(creditId)
  if (!credit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Credit not found')
  }
  res.send(credit)
})

const updateCredit = catchAsync(async (req, res) => {
  const credit = await creditService.updateCreditById(req.params.creditId, req.body)
  res.send(credit)
})

const deleteCredit = catchAsync(async (req, res) => {
  await creditService.deleteCreditById(req.params.creditId)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  createCredit,
  getCredits,
  getCreditById,
  updateCredit,
  deleteCredit,
}
