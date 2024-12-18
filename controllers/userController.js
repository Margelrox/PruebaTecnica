const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Logger = require('../utils/logger');

const logger = new Logger();

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    logger.log(`User created: ${newUser.id} - ${newUser.email}`, newUser.id, req.ip, 'POST');
    res.status(201).json(newUser);
  } catch (error) {
    logger.log(`Error creating user: ${error.message}`, 'Unknown', req.ip, 'POST');
    res.status(400).json({ error: error.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    logger.log(`Listed all users`, 'N/A', req.ip, 'GET');
    res.status(200).json(users);
  } catch (error) {
    logger.log(`Error listing users: ${error.message}`, 'N/A', req.ip, 'GET');
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      logger.log(`Retrieved user: ${user.id} - ${user.email}`, user.id, req.ip, 'GET');
      res.status(200).json(user);
    } else {
      logger.log(`User not found: ID ${id}`, id, req.ip, 'GET');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.log(`Error retrieving user: ${error.message}`, req.params.id, req.ip, 'GET');
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    const [updated] = await User.update({ name, role }, {
      where: { id }
    });

    if (updated) {
      const updatedUser = await User.findByPk(id);
      logger.log(`Updated user: ${updatedUser.id} - ${updatedUser.email}`, updatedUser.id, req.ip, 'PUT');
      res.status(200).json(updatedUser);
    } else {
      logger.log(`User not found for update: ID ${id}`, id, req.ip, 'PUT');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.log(`Error updating user: ${error.message}`, req.params.id, req.ip, 'PUT');
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id }
    });

    if (deleted) {
      logger.log(`Deleted user: ID ${id}`, id, req.ip, 'DELETE');
      res.status(204).json();
    } else {
      logger.log(`User not found for deletion: ID ${id}`, id, req.ip, 'DELETE');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.log(`Error deleting user: ${error.message}`, req.params.id, req.ip, 'DELETE');
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser
};
