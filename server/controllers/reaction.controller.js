const { Reaction } = require('../models/models');

class ReactionController {
  async create(req, res) {
    const { commentId } = req.params;
    const { emoji } = req.body;
    const reaction = await Reaction.create(
      { emoji, commentId, userId: req.user.id });
    res.json({ reaction });
  }

  async update(req, res) {
    const { commentId } = req.params;
    const { emoji } = req.body;
    const reaction = await Reaction.findOne({ where: { commentId } });
    const updatedReaction = await reaction.update({ emoji });
    res.json({ updatedReaction });
  }

  async deleteByCommentId(req, res) {
    const { commentId } = req.params;
    const deleteCount = await Reaction.destroy({ where: { commentId } });
    res.json(deleteCount);
  }
}

module.exports = new ReactionController();
