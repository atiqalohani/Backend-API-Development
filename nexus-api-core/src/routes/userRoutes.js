const express = require('express');
const { getUsers, getUserById, createUser, createUserSchema } = require('../controllers/userController');
const validate = require('../middleware/validate');

const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Validation Error
 */
router.route('/users')
  .get(getUsers)
  .post(validate(createUserSchema), createUser);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User object
 *       404:
 *         description: User not found
 */
router.route('/users/:id')
  .get(getUserById);

module.exports = router;
