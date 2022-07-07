const ApiError = require('../error/ApiError');
const { Project, Status } = require('../models/models');

class StatusController {
  async create(req, res, next) {
    try {
      const { title } = req.body;
      const { projectId } = req.params;
      const status = await Status.create({ title, projectId });
      res.json({ status });
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async get(req, res) {
  }

  async getByProjectId(req, res) {
    const { projectId } = req.params;
    const statuses = await Status.findAll({where: {projectId}});
    res.json(statuses)
  }

  async update(req, res) {

  }

  async delete(req, res) {

  }

  async getRelatedIssues(req, res) {

  }
}

module.exports = new StatusController();
