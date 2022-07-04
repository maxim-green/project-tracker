const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.post('/refresh-tokens', userController.refreshTokens);
router.get('/project/lead', userController.projectLead);
router.get('/project/member', userController.projectMember);
router.get('/issue/reporter', userController.issueReporter);
router.get('/issue/assignee', userController.issueAssignee);

module.exports = router;
