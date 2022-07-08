const Router = require('express');
const router = new Router();
const userRouter = require('./user.router');
const projectRouter = require('./project.router');
const statusRouter = require('./status.router');
const issueRouter = require('./issue.router');
const tagRouter = require('./tag.router');
const commentRouter = require('./comment.router');
const reactionRouter = require('./reaction.router');
const attachmentRouter = require('./attachment.router');
const authMiddleware = require('../middleware/auth.middleware');

router.use('/user', userRouter);
router.use('/project', authMiddleware, projectRouter);
router.use('/status', statusRouter);
router.use('/issue', authMiddleware, issueRouter);
router.use('/tag', tagRouter);
router.use('/comment', commentRouter);
router.use('/reaction', reactionRouter);
router.use('/attachment', attachmentRouter);

module.exports = router;
