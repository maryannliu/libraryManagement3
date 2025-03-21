const express = require('express');
const router = express.Router();
const { getMembers, updateMember, deleteMember, addMember } = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getMembers);
router.post('/', protect, addMember);
router.put('/:id', protect, updateMember);
router.delete('/:id', protect, deleteMember);

module.exports = router;
