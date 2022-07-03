const Router = require('express');
const router = new Router();
const projectController = require('../controllers/project.controller');
const tagController = require('../controllers/tag.controller');
const statusController = require('../controllers/status.controller');
const issueController = require('../controllers/issue.controller');

router.post('/', projectController.create);
router.get('/:projectId', projectController.get);
router.put('/:projectId', projectController.update);
router.delete('/:projectId', projectController.delete);
router.get('/:projectId/issue', projectController.getRelatedIssues);
router.post('/:projectId/issue', issueController.create);
router.get('/:projectId/status', projectController.getRelatedStatuses);
router.post('/:projectId/status', statusController.create);
router.get('/:projectId/tag', projectController.getRelatedTags);
router.post('/:projectId/tag', tagController.create);
router.get('/:projectId/lead', projectController.getLeadUser);
router.get('/:projectId/member', projectController.getMemberUsers);
router.post('/:projectId/member/:userId', projectController.addMemberUser);

module.exports = router;
