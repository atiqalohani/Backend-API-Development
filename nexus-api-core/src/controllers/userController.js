const AppError = require('../utils/appError');
const { z } = require('zod');

// In-memory data store for demonstration
const usersDB = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'user' }
];

// Zod validation schemas
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['admin', 'user']).optional().default('user')
  })
});

const getUsers = (req, res) => {
  res.status(200).json({
    success: true,
    count: usersDB.length,
    data: usersDB
  });
};

const getUserById = (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  const user = usersDB.find((u) => u.id === userId);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
};

const createUser = (req, res) => {
  const { name, email, role } = req.validatedData.body;

  const newUser = {
    id: usersDB.length + 1,
    name,
    email,
    role
  };

  usersDB.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  createUserSchema
};
