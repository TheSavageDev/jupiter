const request = require('supertest')
const faker = require('faker')
const httpStatus = require('http-status')
const app = require('../../src/app')
const setupTestDB = require('../utils/setupTestDB')
const { Debit } = require('../../src/models')
const { debitOne, debitTwo, insertDebits } = require('../fixtures/debit.fixture')
const { userOne, userTwo, admin, insertUsers } = require('../fixtures/user.fixture')

const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture')

setupTestDB()

describe('Debit routes', () => {
  describe('POST /v1/debits', () => {
    let newDebit

    beforeEach(() => {
      newDebit = {
        accountId: faker.random.uuid(),
        amount: faker.finance.amount(),
        description: faker.finance.transactionDescription(),
        to: faker.name.findName(),
        date: '10-10-10',
      }
    })

    test('should return 201 and successfully create a new debit if data is ok', async () => {
      await insertUsers([admin])

      const res = await request(app).post('/v1/debits').set('Authorization', `Bearer ${adminAccessToken}`).send(newDebit).expect(httpStatus.CREATED)

      expect(res.body).toEqual({
        id: expect.anything(),
        accountId: newDebit.accountId,
        amount: newDebit.amount,
        description: newDebit.description,
        to: newDebit.to,
        date: new Date(newDebit.date).toISOString(),
      })

      const dbDebit = await Debit.findById(res.body.id)
      expect(dbDebit).toBeDefined()
    })

    test('should return 401 error if access token is missing', async () => {
      await request(app).post('/v1/debits').send(newDebit).expect(httpStatus.UNAUTHORIZED)
    })

    test('should return 403 error if logged in user is not admin', async () => {
      await insertUsers([userOne])

      await request(app).post('/v1/debits').set('Authorization', `Bearer ${userOneAccessToken}`).send(newDebit).expect(httpStatus.FORBIDDEN)
    })
  })

  describe('GET /v1/debits', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertUsers([admin])
      await insertDebits([debitOne, debitTwo])

      const res = await request(app).get('/v1/debits').set('Authorization', `Bearer ${adminAccessToken}`).send().expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      })
      expect(res.body.results).toHaveLength(2)
      expect(res.body.results[0]).toEqual({
        id: debitOne._id.toHexString(),
        amount: debitOne.amount,
        accountId: debitOne.accountId,
        to: debitOne.to,
        date: new Date(debitOne.date).toISOString(),
        description: debitOne.description,
      })
    })

    test('should return 401 if access token is missing', async () => {
      await insertUsers([admin])
      await insertDebits([debitOne, debitTwo])

      await request(app).get('/v1/debits').send().expect(httpStatus.UNAUTHORIZED)
    })

    test('should correctly apply filter on the to field', async () => {
      await insertUsers([admin])
      await insertDebits([debitOne, debitTwo])

      const res = await request(app).get('/v1/debits').set('Authorization', `Bearer ${adminAccessToken}`).query({ to: debitOne.name }).send().expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      })
      expect(res.body.results).toHaveLength(2)
      expect(res.body.results[0].id).toBe(debitOne._id.toHexString())
    })
  })
})
