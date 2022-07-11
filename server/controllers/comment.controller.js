const { Comment } = require('../models/models');

class CommentController {
  async create(req, res) {
    const { issueId } = req.params;
    const { text } = req.body;

    const comment = await Comment.create({
      text, issueId, userId: req.user.id
    });

    res.json({ comment });
  }

  async get(req, res) {

  }

  async getByIssueId(req, res) {
    const { issueId } = req.params;
    const comments = await Comment.findAll(
      { where: { issueId }, attributes: { exclude: 'issueId' } });
    res.json(comments);
  }

  async update(req, res) {

  }

  async delete(req, res) {

  }

  async getRelatedReactions(req, res) {

  }
}

module.exports = new CommentController();
