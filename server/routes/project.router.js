const Router = require('express');
const router = new Router();
const projectController = require('../controllers/project.controller');
const tagController = require('../controllers/tag.controller');
const statusController = require('../controllers/status.controller');
const issueController = require('../controllers/issue.controller');
const { body, param } = require('express-validator');
const rolesMiddleware = require('../middleware/roles.middleware');
const requireRolesMiddleware = require('../middleware/requireRoles.middleware');
const projectExists = require('../validators/projectExists.validator');
const projectKeyUnique = require('../validators/projectKeyUnique.validator');
const userExists = require('../validators/userExists.validator');
const userIsProjectMember = require('../validators/userIsProjectMember.validator');
const issueExists = require('../validators/issueExists.validator');
const issueIsChildIssue = require('../validators/issueIsChildIssue.validator');
const validationHandlingMiddleware = require('../middleware/validationHandling.middleware');
const projectStatusExists = require('../validators/projectStatusExists.validator');

router.post('/',
  body('key').notEmpty().custom(projectKeyUnique),
  body('title').notEmpty(),
  body('leadId').optional().isNumeric().custom(userExists),
  body('defaultAssigneeId').optional().isNumeric().custom(userExists),
  validationHandlingMiddleware,
  projectController.create
);

router.use('/:projectId',
  param('projectId').isNumeric().custom(projectExists),
  validationHandlingMiddleware,
  rolesMiddleware
)

router.get('/:projectId',
  requireRolesMiddleware(['MEMBER']),
  projectController.get
);

router.put('/:projectId',
  body('key').optional().custom(projectKeyUnique),
  body('title').notEmpty(),
  body('leadId').optional().isNumeric().custom(userExists),
  body('defaultAssigneeId').optional().isNumeric().custom(userExists),
  validationHandlingMiddleware,
  requireRolesMiddleware(['LEAD']),
  projectController.update
);

router.delete('/:projectId',
  requireRolesMiddleware(['LEAD']),
  projectController.delete
);

router.get('/:projectId/issue', issueController.getByProjectId);

router.post('/:projectId/issue',
  body('title').notEmpty(),
  body('statusId').optional().isNumeric().custom(projectStatusExists),
  body('assigneeId').optional().isNumeric().custom(userExists).custom(userIsProjectMember),
  body('reporterId').optional().isNumeric().custom(userExists).custom(userIsProjectMember),
  body('parentIssueId').optional().isNumeric().custom(issueExists).not().custom(issueIsChildIssue)
    .withMessage('Cant add child issue to another child issue'),
  validationHandlingMiddleware,
  requireRolesMiddleware(['MEMBER']),
  issueController.create
);

router.get('/:projectId/status',
  requireRolesMiddleware(['MEMBER']),
  statusController.getByProjectId
);

router.post('/:projectId/status',
  requireRolesMiddleware(['LEAD']),
  statusController.create
);

router.get('/:projectId/tag',
  requireRolesMiddleware(['MEMBER']),
  tagController.getByProjectId
);

router.post('/:projectId/tag',
  requireRolesMiddleware(['LEAD']),
  tagController.create
);

router.get('/:projectId/lead',
  requireRolesMiddleware(['MEMBER']),
  projectController.getLeadUser
);

router.get('/:projectId/member',
  requireRolesMiddleware(['MEMBER']),
  projectController.getMemberUsers
);

router.post('/:projectId/member/:userId',
  param('userId').isNumeric().custom(userExists).not().custom(userIsProjectMember)
    .withMessage('Already a member'),
  validationHandlingMiddleware,
  requireRolesMiddleware(['LEAD']),
  projectController.addMemberUser
);

module.exports = router;
