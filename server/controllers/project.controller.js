const {Project} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class ProjectController {
  async create(req, res, next) {
    try {
      const {key, title, description, leadId, defaultAssigneeId} = req.body;
      const {icon} = req.files;
      const extension = icon.name.match(/\..+$/)[0];
      let filename = uuid.v4() + extension;
      icon.mv(path.resolve(__dirname, '..', 'static', filename));
      const project = await Project.create({
        key,
        title,
        description,
        icon: filename,
      });
      // project.setLead(leadId || userId)
      // project.setDefaultAssignee(defaultAssigneeId || userId)
      res.json(project);
    } catch (e) {
      next(ApiError.badRequest(e.message))
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
  async getRelatedStatuses(req, res) {

  }
  async getRelatedTags(req, res) {

  }
  async getLeadUser(req, res) {

  }
  async getMemberUsers(req, res) {

  }
  async addMemberUser(req, res) {

  }
}

module.exports = new ProjectController();
