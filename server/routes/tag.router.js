const Router = require('express');
const router = new Router();
const tagController = require('../controllers/tag.controller');

router.get('/:tagId', tagController.get);
router.put('/:tagId', tagController.update);
router.delete('/:tagId', tagController.delete);
router.get('/:tagId/issue', tagController.getRelatedIssues);

module.exports = router;
