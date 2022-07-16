const adminController = require('./admin.controller.js')
const router = require('express').Router()
const { checkAdminPermission } = require('../../middlewares/authMiddleware');

router.post('/receiver', checkAdminPermission, adminController.postReiver)   //        /api/admin/receiver
router.post('/supplier', checkAdminPermission, adminController.addSupplier)   //    /api/admin/supplier
router.get('/suppliers', checkAdminPermission, adminController.getSuppliers)   //    /api/admin/supplier

router.get('/search', adminController.getVouchersBySearch);
router.get('/category/:category', adminController.getVouchersByCategory);
router.get('/list', adminController.getVouchers)
router.post('/voucher', checkAdminPermission, adminController.addVoucher)
router.post('/add-voucher-code', checkAdminPermission, adminController.addVoucherCode)
router.get('/edit/:id', checkAdminPermission, adminController.getVoucher)
router.post('/edit/:id', checkAdminPermission, adminController.updateVoucher)
router.delete('/delete/:id', checkAdminPermission, adminController.deleteVoucher)
module.exports = router;