const Router = require('express');
const router = new Router();
const issueController = require('../controllers/issue.controller');
const commentController = require('../controllers/comment.controller');
const attachmentController = require('../controllers/attachment.controller');

router.get('/:issueId', issueController.get);
router.put('/:issueId', issueController.update);
router.delete('/:issueId', issueController.delete);
router.get('/:issueId/comment', issueController.getRelatedComments);
router.post('/:issueId/comment', commentController.create);
router.get('/:issueId/tag', issueController.getRelatedTags);
router.post('/:issueId/tag/:tagId?', issueController.addTag);
router.delete('/:issueId/tag/:tagId', issueController.deleteTag);
router.get('/:issueId/attachment', issueController.getRelatedAttachments);
router.post('/:issueId/attachment', attachmentController.create);

module.exports = router;
