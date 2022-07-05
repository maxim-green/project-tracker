const ApiError = require('../error/ApiError');
const { Project, Status } = require('../models/models');

class StatusController {
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
        return next(
          ApiError.forbidden('Only lead user can add statuses to project'));
      }
      const testTitleStatus = await Status.findOne(
        { where: { title, projectId } });
      if (testTitleStatus) {
        return next(
          ApiError.badRequest('Status with that title exists in project'));
      }
      const status = await Status.create({ title, projectId });
      res.json({ status });
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

module.exports = new StatusController();
