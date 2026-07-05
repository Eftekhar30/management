const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/notices', noticeController.getNotices);

router.post(
    '/notices', 
    verifyToken,  
    authorizeRoles('Admin', 'CR'),
    noticeController.createNotice
);

module.exports = router;