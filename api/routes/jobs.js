const express = require('express');
const router = express.Router();

const JobsController = require('../controllers/jobs');

router.get('/', JobsController.jobs_get_all);

router.get('/:streetId', JobsController.jobs_get_jobs_by_street);

router.post('/', JobsController.jobs_create_job);

router.patch('/:jobId', JobsController.jobs_update_job);

router.delete('/:jobId', JobsController.jobs_delete_job);

module.exports = router;