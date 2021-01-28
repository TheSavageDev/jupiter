const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createDebit = {
  body: Joi.object().keys({
    accountId: Joi.string().required(),
    to: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
  }),
}

const getDebits = {
  query: Joi.object().keys({
    to: Joi.string(),
    amount: Joi.number(),
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}

const getDebit = {
  params: Joi.object().keys({
    debitId: Joi.string().custom(objectId),
  }),
}

const updateDebit = {
  params: Joi.object().keys({
    debitId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      to: Joi.string(),
      amount: Joi.number(),
      description: Joi.string(),
      date: Joi.date(),
    })
    .min(1),
}

const deleteDebit = {
  params: Joi.object().keys({
    debitId: Joi.string().custom(objectId),
  }),
}

module.exports = {
  createDebit,
  getDebits,
  getDebit,
  updateDebit,
  deleteDebit,
}
