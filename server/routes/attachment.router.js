const Router = require('express');
const router = new Router();
const attachmentController = require('../controllers/attachment.controller');
const { param } = require('express-validator');
const validationHandlingMiddleware = require(
  '../middleware/validationHandling.middleware');
const rolesMiddleware = require('../middleware/roles.middleware');
const attachmentExists = require('../validators/attachmentExists.validator');
const requireRolesMiddleware = require(
  '../middleware/requireRoles.middleware');

router.use('/:attachmentId',
  param('attachmentId').isNumeric().custom(attachmentExists),
  validationHandlingMiddleware,
  rolesMiddleware
);

router.delete('/:attachmentId',
  requireRolesMiddleware(['LEAD', 'ATTACHMENT_AUTHOR']),
  attachmentController.delete
);

module.exports = router;
