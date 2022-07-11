const Router = require('express');
const router = new Router();
const commentController = require('../controllers/comment.controller');
const reactionController = require('../controllers/reaction.controller');
const { param, body } = require('express-validator');
const commentExists = require('../validators/commentExists.validator');
const commentHaveReactionFromUser = require(
  '../validators/commentHaveReactionFromUser.validator');
const validationHandlingMiddleware = require(
  '../middleware/validationHandling.middleware');
const requireRolesMiddleware = require(
  '../middleware/requireRoles.middleware');
const rolesMiddleware = require('../middleware/roles.middleware');

router.use('/:commentId',
  param('commentId').isNumeric().custom(commentExists),
  validationHandlingMiddleware,
  rolesMiddleware
);

router.put('/:commentId',
  body('text').notEmpty(),
  validationHandlingMiddleware,
  requireRolesMiddleware(['COMMENT_AUTHOR', 'LEAD']),
  commentController.update
);

router.delete('/:commentId',
  requireRolesMiddleware(['COMMENT_AUTHOR', 'LEAD']),
  commentController.delete
);

router.post('/:commentId/reaction',
  body('emoji').notEmpty(),
  param('commentId').not().custom(commentHaveReactionFromUser)
    .withMessage('Already reacted to this comment'),
  validationHandlingMiddleware,
  requireRolesMiddleware(['MEMBER']),
  reactionController.create
);

router.put('/:commentId/reaction',
  body('emoji').notEmpty(),
  param('commentId').custom(commentHaveReactionFromUser),
  validationHandlingMiddleware,
  requireRolesMiddleware(['COMMENT_AUTHOR']),
  reactionController.update
);

router.delete('/:commentId/reaction',
  param('commentId').custom(commentHaveReactionFromUser),
  validationHandlingMiddleware,
  requireRolesMiddleware(['COMMENT_AUTHOR']),
  reactionController.deleteByCommentId
);

module.exports = router;
