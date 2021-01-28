const httpStatus = require('http-status')
const { Credit } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create a Credit
 *
 * @param {Object} - creditBody
 * @returns {Promise<Credit>}
 */
const createCredit = async creditBody => {
  const credit = await Credit.create(creditBody)
  return credit
}

/**
 * Query for Credits
 *
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult}
 */
const queryCredits = async (filter, options) => {
  const credits = await Credit.paginate(filter, options)
  return credits
}

/**
 * Get credit by id
 *
 * @param {ObjectId} creditId
 * @returns {Promise<Credit>}
 */
const getCreditById = async creditId => Credit.findById(creditId)

/**
 * Update credit by id
 *
 * @param {ObjectId} creditId
 * @param {Object} updateBody
 * @returns {Promise<Credit}
 */
const updateCreditById = async (creditId, updateBody) => {
  const credit = await getCreditById(creditId)
  if (!credit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Credit not found')
  }
  Object.assign(credit, updateBody)
  await credit.save()
  return credit
}

/**
 * Delete credit by id
 *
 * @param {ObjectId} creditId
 * @returns {Promise<Credit>}
 */
const deleteCreditById = async creditId => {
  const credit = await getCreditById(creditId)
  if (!credit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Credit not found')
  }
  await credit.remove()
  return credit
}

module.exports = {
  createCredit,
  queryCredits,
  getCreditById,
  updateCreditById,
  deleteCreditById,
}
