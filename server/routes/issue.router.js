const Router = require('express');
const router = new Router();
const issueController = require('../controllers/issue.controller');
const commentController = require('../controllers/comment.controller');
const attachmentController = require('../controllers/attachment.controller');
const {param} = require('express-validator');
const issueExists = require('../validators/issueExists.validator');
const validationHandlingMiddleware = require(
  '../middleware/validationHandling.middleware');
const rolesMiddleware = require('../middleware/roles.middleware');
const requireRolesMiddleware = require(
  '../middleware/requireRoles.middleware');

router.use('/:issueId',
  param('issueId').isNumeric().custom(issueExists),
  validationHandlingMiddleware,
  rolesMiddleware
)

router.get('/:issueId',
  requireRolesMiddleware(['MEMBER']),
  issueController.get
);

router.put('/:issueId',
  requireRolesMiddleware(['MEMBER']), // todo: correct this middleware to have 'all' or 'oneOf' rules
  issueController.update
);

router.delete('/:issueId', issueController.delete);
router.get('/:issueId/comment', issueController.getRelatedComments);
router.post('/:issueId/comment', commentController.create);
router.get('/:issueId/tag', issueController.getRelatedTags);
router.post('/:issueId/tag/:tagId?', issueController.addTag);
router.delete('/:issueId/tag/:tagId', issueController.deleteTag);
router.get('/:issueId/attachment', issueController.getRelatedAttachments);
router.post('/:issueId/attachment', attachmentController.create);

module.exports = router;
