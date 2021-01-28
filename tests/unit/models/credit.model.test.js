const faker = require('faker')
const { Credit } = require('../../../src/models')

describe('Credit model', () => {
  describe('Credit validation', () => {
    let newCredit
    beforeEach(() => {
      newCredit = {
        accountId: faker.random.uuid(),
        amount: faker.finance.amount(),
        description: faker.finance.transactionDescription,
        from: faker.name.findName(),
        date: faker.date.past(),
      }
    })

    test('should correctly validate a valid credit', async () => {
      await expect(new Credit(newCredit).validate()).resolves.toBeUndefined()
    })
  })
})
