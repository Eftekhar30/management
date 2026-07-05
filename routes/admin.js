const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.put(
    '/assign-role',
    verifyToken,
    authorizeRoles('Admin'),
    adminController.updateUserRole
);

router.get('/users', verifyToken, authorizeRoles('Admin'), adminController.getAllUsers);


module.exports = router;