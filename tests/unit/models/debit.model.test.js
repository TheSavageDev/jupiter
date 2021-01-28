const faker = require('faker')
const { Debit } = require('../../../src/models')

describe('Debit model', () => {
  describe('Debit validation', () => {
    let newDebit
    beforeEach(() => {
      newDebit = {
        accountId: faker.random.uuid(),
        amount: faker.finance.amount(),
        description: faker.finance.transactionDescription,
        to: faker.name.findName(),
        date: faker.date.past(),
      }
    })

    test('should correctly validate a valid debit', async () => {
      await expect(new Debit(newDebit).validate()).resolves.toBeUndefined()
    })
  })
})
