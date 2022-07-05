const ApiError = require('../error/ApiError');
const { Project, Tag, ProjectMember } = require('../models/models');

class TagController {
  async create(req, res, next) {
    try {
      const { title } = req.body;
      if (!title) {
        return next(ApiError.badRequest('Title is required'));
      }
      const { projectId } = req.params;
      const project = await Project.findOne({ where: { id: projectId } });
      if (!project) {
        return next(ApiError.badRequest('Project not exist'));
      }
      const isLead = project.leadId === req.user.id;
      if (!isLead) {
        return next(ApiError.forbidden('Only lead user can delete project'));
      }
      const testTitleTag = await Tag.findOne(
        { where: { title, projectId } });
      if (testTitleTag) {
        return next(
          ApiError.badRequest('Tag with that title exists in project'));
      }
      const tag = await Tag.create({ title, projectId });
      res.json({ tag });
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }
  async get(req, res) {

  }
  async update(req, res) {

  }
  async delete(req, res) {

  }
  async getRelatedIssues(req, res) {

  }
}

module.exports = new TagController();
