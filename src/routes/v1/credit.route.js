const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const creditValidation = require('../../validations/credit.validation')
const creditController = require('../../controllers/credit.controller')

const router = express.Router()

router
  .route('/')
  .post(auth('manageUsers'), validate(creditValidation.createCredit), creditController.createCredit)
  .get(auth('getUsers'), validate(creditValidation.getCredits), creditController.getCredits)

router
  .route('/:creditId')
  .get(auth('getUsers'), validate(creditValidation.getCredit), creditController.getCreditById)
  .patch(auth('manageUsers'), validate(creditValidation.updateCredit), creditController.updateCredit)
  .delete(auth('manageUsers'), validate(creditValidation.deleteCredit), creditController.deleteCredit)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Credits
 *   description: Credit management and retrieval
 */

/**
 * @swagger
 * path:
 *  /credits:
 *    post:
 *      summary: Create a credit
 *      description: Only account admins can create credits.
 *      tags: [Credits]
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
 *                  description: Account that the credit belongs to.
 *                to:
 *                  type: string
 *                  description: Who the credit was paid to.
 *                description:
 *                  type: string
 *                  description: Explanation of the credit.
 *                amount:
 *                  type: number
 *                  description: Amount of credit.
 *                date:
 *                  type: date
 *                  description: When the credit happened.
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
 *                 $ref: '#/components/schemas/Credit'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *    get:
 *      summary: Get all credits
 *      description: Only account admins can retrieve all credits.
 *      tags: [Credits]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: to
 *          schema:
 *            type: string
 *          description: to whom the credit was paid
 *        - in: query
 *          name: amount
 *          schema:
 *            type: string
 *          description: Credit Amount
 *        - in: query
 *          name: date
 *          schema:
 *            type: string
 *          description: Credit Date
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
 *          description: Maximum number of credits
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
 *                      $ref: '#/components/schemas/Credit'
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
 *  /credits/{id}:
 *    get:
 *      summary: Get a credit
 *      description: Logged in users can fetch only their own credit information.
 *      tags: [Credits]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Credit id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Credit'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a credit
 *      description: Logged in users can only update their own credits.
 *      tags: [Credits]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Credit id
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
 *                  description: Account that the credit belongs to.
 *                to:
 *                  type: string
 *                  description: Who the credit was paid to.
 *                description:
 *                  type: string
 *                  description: Explanation of the credit.
 *                amount:
 *                  type: number
 *                  description: Amount of credit.
 *                date:
 *                  type: date
 *                  description: When the credit happened.
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
 *                 $ref: '#/components/schemas/Credit'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a credit
 *      description: Users can delete credits from their account.
 *      tags: [Credits]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Credit id
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
