const express = require('express');
const { createUser, listUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/usuarios', createUser);
router.get('/usuarios', listUsers);
router.get('/usuarios/:id', getUserById);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);

module.exports = router;
