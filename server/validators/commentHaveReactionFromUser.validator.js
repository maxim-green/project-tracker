const { Reaction } = require('../models/models');

module.exports = (commentId, { req }) => {

  return Reaction.findOne({ where: { commentId, userId: req.user.id } })
    .then(reaction => {
      if (!reaction) return Promise.reject(
        `Comment ${commentId} dont have reaction from user ${req.user.id}`);
    });
};
