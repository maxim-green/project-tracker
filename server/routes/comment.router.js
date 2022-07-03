const Router = require('express');
const router = new Router();
const commentController = require('../controllers/comment.controller');
const reactionController = require('../controllers/reaction.controller');

router.get('/:commentId', commentController.get);
router.put('/:commentId', commentController.update);
router.delete('/:commentId', commentController.delete);
router.get('/:commentId/reaction', commentController.getRelatedReactions);
router.post('/:commentId/reaction', reactionController.create);

module.exports = router;
