const Router = require('express');
const router = new Router();
const tagController = require('../controllers/tag.controller');
const issueController = require('../controllers/issue.controller');
const { param } = require('express-validator');
const tagExists = require('../validators/tagExists.validator');
const validationHandlingMiddleware = require(
  '../middleware/validationHandling.middleware');
const rolesMiddleware = require('../middleware/roles.middleware');
const requireRolesMiddleware = require('../middleware/requireRoles.middleware');

router.use('/:tagId',
  param('tagId').isNumeric().custom(tagExists),
  validationHandlingMiddleware,
  rolesMiddleware
)

router.get('/:tagId', tagController.get);
router.put('/:tagId', tagController.update);
router.delete('/:tagId', tagController.delete);
router.get('/:tagId/issue',
  requireRolesMiddleware(['MEMBER']),
  issueController.getByTagId
);

module.exports = router;
