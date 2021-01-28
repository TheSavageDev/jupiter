const express = require('express')
const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const debitRoute = require('./debit.route')
const creditRoute = require('./credit.route')
const docsRoute = require('./docs.route')
const config = require('../../config/config')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/debits',
    route: debitRoute,
  },
  {
    path: '/credits',
    route: creditRoute,
  },
]

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach(route => {
    router.use(route.path, route.route)
  })
}

module.exports = router
