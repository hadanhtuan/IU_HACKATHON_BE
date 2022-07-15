const adminController = require('./admin.controller.js')
const router = require('express').Router()
const { checkAdminPermission } = require('../../middlewares/authMiddleware');

router.post('/receiver', checkAdminPermission, adminController.postReiver)   //        /api/admin/receiver


module.exports = router;