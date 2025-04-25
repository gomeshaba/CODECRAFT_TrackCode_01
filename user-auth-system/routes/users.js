const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/me', protect, userController.getMe);
router.put('/updatedetails', protect, userController.updateDetails);
router.put('/updatepassword', protect, userController.updatePassword);

module.exports = router;