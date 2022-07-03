const Router = require('express');
const router = new Router();
const attachmentController = require('../controllers/attachment.controller');

router.delete('/:attachmentId', attachmentController.delete);

module.exports = router;
