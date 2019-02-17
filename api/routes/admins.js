const express = require('express');
const router = express.Router();

const AdminsController = require('../controllers/admins');

router.get('/', AdminsController.admins_get_all);

router.get('/:adminId', AdminsController.admins_get_admin);

router.post('/', AdminsController.admins_create_admin);

router.patch('/:adminId', AdminsController.admins_update_admin);

router.delete('/:adminId', AdminsController.admins_delete_admin);

module.exports = router;