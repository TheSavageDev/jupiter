const httpStatus = require('http-status')
const { Debit } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create an Debit
 *
 * @param {Object} - debitBody
 * @returns {Promise<Debit>}
 */
const createDebit = async debitBody => {
  const debit = await Debit.create(debitBody)
  return debit
}

/**
 * Query for Debits
 *
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDebits = async (filter, options) => {
  const debits = await Debit.paginate(filter, options)
  return debits
}

/**
 * Get debit by id
 *
 * @param {ObjectId} debitId
 * @returns {Promise<Debit>}
 */
const getDebitById = async debitId => Debit.findById(debitId)

/**
 * Update debit by id
 *
 * @param {ObjectId} debitId
 * @param {Object} updateBody
 * @returns {Promise<Debit>}
 */
const updateDebitById = async (debitId, updateBody) => {
  const debit = await getDebitById(debitId)
  if (!debit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Debit not found')
  }
  Object.assign(debit, updateBody)
  await debit.save()
  return debit
}

/**
 * Delete debit by id
 *
 * @param {ObjectId} debitId
 * @returns {Promise<Debit>}
 */
const deleteDebitById = async debitId => {
  const debit = await getDebitById(debitId)
  if (!debit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Debit not found')
  }
  await debit.remove()
  return debit
}

module.exports = {
  createDebit,
  queryDebits,
  getDebitById,
  updateDebitById,
  deleteDebitById,
}
