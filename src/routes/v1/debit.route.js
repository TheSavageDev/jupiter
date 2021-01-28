const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const debitValidation = require('../../validations/debit.validation')
const debitController = require('../../controllers/debit.controller')

const router = express.Router()

router
  .route('/')
  .post(auth('manageUsers'), validate(debitValidation.createDebit), debitController.createDebit)
  .get(auth('getUsers'), validate(debitValidation.getDebits), debitController.getDebits)

router
  .route('/:debitId')
  .get(auth('getUsers'), validate(debitValidation.getDebit), debitController.getDebitById)
  .patch(auth('manageUsers'), validate(debitValidation.updateDebit), debitController.updateDebit)
  .delete(auth('manageUsers'), validate(debitValidation.deleteDebit), debitController.deleteDebit)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Debits
 *   description: Debit management and retrieval
 */

/**
 * @swagger
 * path:
 *  /debits:
 *    post:
 *      summary: Create a debit
 *      description: Only account admins can create debits.
 *      tags: [Debits]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - accountId
 *                - to
 *                - description
 *                - amount
 *                - date
 *              properties:
 *                accountId:
 *                  type: string
 *                  description: Account that the debit belongs to.
 *                to:
 *                  type: string
 *                  description: Who the debit was paid to.
 *                description:
 *                  type: string
 *                  description: Explanation of the debit.
 *                amount:
 *                  type: number
 *                  description: Amount of debit.
 *                date:
 *                  type: date
 *                  description: When the debit happened.
 *              example:
 *                accountId: fakeaccountid
 *                to: fake to line
 *                description: fake description
 *                amount: 100
 *                date: 10-10-10
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Debit'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *    get:
 *      summary: Get all debits
 *      description: Only account admins can retrieve all debits.
 *      tags: [Debits]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: to
 *          schema:
 *            type: string
 *          description: to whom the debit was paid
 *        - in: query
 *          name: amount
 *          schema:
 *            type: string
 *          description: Debit Amount
 *        - in: query
 *          name: date
 *          schema:
 *            type: string
 *          description: Debit Date
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of debits
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Debit'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /debits/{id}:
 *    get:
 *      summary: Get a debit
 *      description: Logged in users can fetch only their own debit information.
 *      tags: [Debits]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Debit id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Debit'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a debit
 *      description: Logged in users can only update their own debits.
 *      tags: [Debits]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Debit id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - accountId
 *                - to
 *                - description
 *                - amount
 *                - date
 *              properties:
 *                accountId:
 *                  type: string
 *                  description: Account that the debit belongs to.
 *                to:
 *                  type: string
 *                  description: Who the debit was paid to.
 *                description:
 *                  type: string
 *                  description: Explanation of the debit.
 *                amount:
 *                  type: number
 *                  description: Amount of debit.
 *                date:
 *                  type: date
 *                  description: When the debit happened.
 *              example:
 *                accountId: fakeaccountid
 *                to: fake to line
 *                description: fake description
 *                amount: 100
 *                date: 10-10-10
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Debit'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a debit
 *      description: Users can delete debits from their account.
 *      tags: [Debits]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Debit id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
