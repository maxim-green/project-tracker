const Router = require('express');
const router = new Router();
const projectController = require('../controllers/project.controller');
const tagController = require('../controllers/tag.controller');
const statusController = require('../controllers/status.controller');
const issueController = require('../controllers/issue.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, projectController.create);
router.get('/:projectId', authMiddleware, projectController.get);
router.put('/:projectId', authMiddleware, projectController.update);
router.delete('/:projectId', authMiddleware, projectController.delete);
router.get('/:projectId/issue', projectController.getRelatedIssues);
router.post('/:projectId/issue', issueController.create);
router.get('/:projectId/status', authMiddleware, projectController.getRelatedStatuses);
router.post('/:projectId/status', authMiddleware, statusController.create);
router.get('/:projectId/tag', authMiddleware, projectController.getRelatedTags);
router.post('/:projectId/tag', authMiddleware, tagController.create);
router.get('/:projectId/lead', authMiddleware, projectController.getLeadUser);
router.get('/:projectId/member', authMiddleware, projectController.getMemberUsers);
router.post('/:projectId/member/:userId', authMiddleware, projectController.addMemberUser);

module.exports = router;
