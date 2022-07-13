const Router = require('express');
const router = new Router();
const issueController = require('../controllers/issue.controller');
const commentController = require('../controllers/comment.controller');
const attachmentController = require('../controllers/attachment.controller');
const tagController = require('../controllers/tag.controller');
const {param, body} = require('express-validator');
const issueExists = require('../validators/issueExists.validator');
const issueHaveTag = require('../validators/issueHaveTag.validator');
const validationHandlingMiddleware = require(
  '../middleware/validationHandling.middleware');
const rolesMiddleware = require('../middleware/roles.middleware');
const requireRolesMiddleware = require(
  '../middleware/requireRoles.middleware');
const projectStatusExists = require(
  '../validators/projectStatusExists.validator');
const projectTagExists = require(
  '../validators/projectTagExists.validator');
const userExists = require('../validators/userExists.validator');
const userIsProjectMember = require(
  '../validators/userIsProjectMember.validator');
const fileProvided = require(
  '../validators/fileProvided.validator'
);

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
  body('title').notEmpty(),
  body('statusId').optional().isNumeric().custom(projectStatusExists),
  body('assigneeId').optional().isNumeric().custom(userExists).custom(userIsProjectMember),
  body('reporterId').optional().isNumeric().custom(userExists).custom(userIsProjectMember),
  validationHandlingMiddleware,
  requireRolesMiddleware(['LEAD', 'REPORTER']),
  issueController.update
);

router.delete('/:issueId',
  requireRolesMiddleware(['LEAD']),
  issueController.delete
);

router.post('/:issueId/tag/:tagId',
  param('tagId').isNumeric().custom(projectTagExists).not().custom(issueHaveTag)
    .withMessage('Issue already have this tag.'),
  validationHandlingMiddleware,
  requireRolesMiddleware(['LEAD', 'REPORTER', 'ASSIGNEE']),
  issueController.addTag
);

router.post('/:issueId/tag',
  body('title').notEmpty(),
  validationHandlingMiddleware,
  requireRolesMiddleware(['LEAD', 'REPORTER', 'ASSIGNEE']),
  issueController.addTag
);

router.get('/:issueId/tag',
  requireRolesMiddleware(['MEMBER']),
  tagController.getByIssueId
);

router.delete('/:issueId/tag/:tagId',
  param('tagId').isNumeric().custom(issueHaveTag),
  validationHandlingMiddleware,
  requireRolesMiddleware(['LEAD', 'REPORTER', 'ASSIGNEE']),
  issueController.deleteTag
);

router.get('/:issueId/comment',
  validationHandlingMiddleware,
  requireRolesMiddleware(['MEMBER']),
  commentController.getByIssueId
);

router.post('/:issueId/comment',
  body('text').notEmpty(),
  validationHandlingMiddleware,
  requireRolesMiddleware(['MEMBER']),
  commentController.create
);

router.post('/:issueId/attachment',
  body('attachments').custom(fileProvided),
  validationHandlingMiddleware,
  requireRolesMiddleware(['MEMBER']),
  attachmentController.create
);

router.get('/:issueId/attachment',
  requireRolesMiddleware(['MEMBER']),
  attachmentController.getByIssueId
);


module.exports = router;
