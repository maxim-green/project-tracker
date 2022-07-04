const { Project, ProjectMember } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class ProjectController {
  async create(req, res, next) {
    try {
      const { key, title, description, leadId, defaultAssigneeId } = req.body;
      const testProject = await Project.findOne({ where: { key } });
      if (testProject) {
        return next(ApiError.badRequest('Project with that key already exist'));
      }
      const { icon } = req.files;
      const extension = icon.name.match(/\..+$/)[0];
      let filename = uuid.v4() + extension;
      icon.mv(path.resolve(__dirname, '..', 'static', filename));
      const project = await Project.create({
        key,
        title,
        description,
        icon: filename,
      });
      project.setLead(leadId || req.user.id);
      project.setDefaultAssignee(defaultAssigneeId || req.user.id);
      await ProjectMember.create({
        userId: req.user.id,
        projectId: project.id
      });
      res.json(project);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async get(req, res, next) {
    try {
      const { projectId } = req.params;
      const projectMember = await ProjectMember.findOne({
        where: { projectId, userId: req.user.id }
      });
      if (!projectMember) {
        return next(ApiError.forbidden('Not a member of that project'));
      }
      const project = await Project.findOne({where: {id: projectId}})
      return res.json({ project });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async update(req, res, next) {
    try { // todo: finish this logic
      const { key, title, description, leadId, defaultAssigneeId } = req.body;
      const testProject = await Project.findOne({ where: { key } });
      if (testProject && (key !== testProject.key)) {
          return next(ApiError.badRequest('Project with that key already exist'));
      }
      const { icon } = req.files;
      const extension = icon.name.match(/\..+$/)[0];
      let filename = uuid.v4() + extension;
      icon.mv(path.resolve(__dirname, '..', 'static', filename));
      const { projectId } = req.params;
      const project = await Project.findOne({
        where: {id: projectId},
      });
      if (!project) {
        return next(ApiError.badRequest('Project not exist'));
      }
      const isLead = project.leadId === req.user.id;
      if (!isLead) {
        return next(ApiError.forbidden('Only lead user can edit project'));
      }
      const updatedProject = await project.update({key, title, description, leadId, defaultAssigneeId, icon: filename})
      return res.json({ updatedProject });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { projectId } = req.params;
      const project = await Project.findOne({
        where: {id: projectId},
      });
      if (!project) {
        return next(ApiError.badRequest('Project not exist'));
      }
      const isLead = project.leadId === req.user.id;
      if (!isLead) {
        return next(ApiError.forbidden('Only lead user can delete project'));
      }
      project.destroy();
      return res.json({ project });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
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
