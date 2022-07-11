const { Comment } = require('../models/models');

module.exports = commentId => {
  return Comment.findOne({where: {id: commentId}}).then(comment => {
    if (!comment) return Promise.reject('Comment not exist.')
  })
};
