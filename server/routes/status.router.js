const Router = require('express');
const router = new Router();
const statusController = require('../controllers/status.controller');

router.get('/:statusId', statusController.get);
router.put('/:statusId', statusController.update);
router.delete('/:statusId', statusController.delete);
router.get('/:statusId/issue', statusController.getRelatedIssues);

module.exports = router;
