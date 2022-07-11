const ApiError = require('../error/ApiError');
const { Tag, IssueTag } = require('../models/models');

class TagController {
  async create(req, res, next) {
    try {
      const { title } = req.body;
      const { projectId } = req.params;
      const tag = await Tag.create({ title, projectId });
      res.json({ tag });
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async get(req, res) {

  }

  async getByProjectId(req, res) {
    const { projectId } = req.params;
    const tags = await Tag.findAll({ where: { projectId } });
    res.json(tags);
  }

  async getByIssueId(req, res) {
    const { issueId } = req.params;
    const tagIssues = await IssueTag.findAll({
      where: { issueId }, include: { model: Tag }
    });
    res.json(tagIssues.map(tagIssue => tagIssue.tag));
  }

  async update(req, res) {

  }

  async delete(req, res) {

  }

  async getRelatedIssues(req, res) {

  }
}

module.exports = new TagController();
