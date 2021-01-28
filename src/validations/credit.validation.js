const Joi = require('Joi')
const { objectId } = require('./custom.validation')

const createCredit = {
  body: Joi.object().keys({
    accountId: Joi.string().required(),
    from: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
  }),
}

const getCredits = {
  query: Joi.object().keys({
    from: Joi.string(),
    amount: Joi.number(),
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}

const getCredit = {
  params: Joi.object().keys({
    creditId: Joi.string().custom(objectId),
  }),
}

const updateCredit = {
  params: Joi.object().keys({
    creditId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      from: Joi.string(),
      amount: Joi.number(),
      description: Joi.string(),
      date: Joi.date(),
    })
    .min(1),
}

const deleteCredit = {
  params: Joi.object().keys({
    creditId: Joi.string().custom(objectId),
  }),
}

module.exports = {
  createCredit,
  getCredits,
  getCredit,
  updateCredit,
  deleteCredit,
}
