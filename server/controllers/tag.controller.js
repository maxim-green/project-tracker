const ApiError = require('../error/ApiError');
const { Project, Tag, ProjectMember } = require('../models/models');

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
    const tags = await Tag.findAll({where: {projectId}});
    res.json(tags)
  }
  async update(req, res) {

  }
  async delete(req, res) {

  }
  async getRelatedIssues(req, res) {

  }
}

module.exports = new TagController();
