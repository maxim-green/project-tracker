const Router = require('express');
const router = new Router();
const reactionController = require('../controllers/reaction.controller');

router.put('/:reactionId', reactionController.update);
router.delete('/:reactionId', reactionController.delete);

module.exports = router;
