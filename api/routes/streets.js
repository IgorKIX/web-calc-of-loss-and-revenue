const express = require('express');
const router = express.Router();


const StreetsController = require('../controllers/streets');

router.get('/', StreetsController.streets_get_all);

router.get('/:streetId', StreetsController.streets_get_street);

router.post('/', StreetsController.streets_create_street);

router.patch('/:streetId', StreetsController.streets_update_street);

router.delete('/:streetId', StreetsController.streets_delete_street);

module.exports = router;