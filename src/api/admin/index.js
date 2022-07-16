const adminController = require('./admin.controller.js')
const router = require('express').Router()
const { checkAdminPermission } = require('../../middlewares/authMiddleware');

const upload = require('../../../utils/multer.config');

router.post('/receiver', upload.single('image'), adminController.postReiver)   //           /api/admin/receiver
router.post('/update-receiver', upload.single('proofImg'), adminController.updateReceiver)   //           /api/admin/receiver

router.post('/supplier', checkAdminPermission, upload.single('image'), adminController.addSupplier)   //    /api/admin/supplier
router.get('/suppliers', adminController.getSuppliers)   //    /api/admin/supplier

router.get('/search', adminController.getVouchersBySearch);
router.get('/category/:category', adminController.getVouchersByCategory);
router.get('/list', adminController.getVouchers)
router.post('/voucher', checkAdminPermission, upload.single('image'), adminController.addVoucher)
router.post('/add-voucher-code', checkAdminPermission, adminController.addVoucherCode)
router.get('/edit/:id', checkAdminPermission, adminController.getVoucher)
router.post('/edit/:id', checkAdminPermission, adminController.updateVoucher)
router.delete('/delete/:id', checkAdminPermission, adminController.deleteVoucher)
module.exports = router;