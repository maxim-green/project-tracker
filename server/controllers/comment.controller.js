const { Comment, Reaction } = require('../models/models');

class CommentController {
  async create(req, res) {
    const { issueId } = req.params;
    const { text } = req.body;

    const comment = await Comment.create({
      text, issueId, userId: req.user.id
    });

    res.json({ comment });
  }

  async getByIssueId(req, res) {
    const { issueId } = req.params;
    const comments = await Comment.findAll(
      { where: { issueId }, include: {model: Reaction, as: 'reactions'}, attributes: { exclude: 'issueId' } });
    res.json(comments);
  }

  async update(req, res) {
    const {text} = req.body;
    const {commentId} = req.params;

    const comment = await Comment.findOne({where: {id: commentId}});
    const updatedComment = await comment.update({text});

    res.json(updatedComment)
  }

  async delete(req, res) {
    const {commentId} = req.params;
    const deletedCount = await Comment.destroy({where: { id: commentId }});
    res.json(deletedCount);
  }
}

module.exports = new CommentController();
