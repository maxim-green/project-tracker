const { Project, ProjectMember, User } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const saveStaticFile = (file) => {
  const extension = file.name.match(/\..+$/)[0];
  let filename = uuid.v4() + extension;
  file.mv(path.resolve(__dirname, '..', 'static', filename));
  return filename;
};

const deleteStaticFile = (filename) => {
  const filePath = path.resolve(__dirname, '..', 'static', filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

class ProjectController {
  async create(req, res, next) {
    try {
      const { key, title, description, leadId, defaultAssigneeId } = req.body;
      const testProject = await Project.findOne({ where: { key } });
      if (testProject) {
        return next(ApiError.badRequest('Project with that key already exist'));
      }
      const { icon } = req.files;
      const filename = saveStaticFile(icon);
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
      const project = await Project.findOne({ where: { id: projectId } });
      return res.json({ project });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { key, title, description, leadId, defaultAssigneeId } = req.body;
      const { icon } = req.files;
      const filename = saveStaticFile(icon);
      const { projectId } = req.params;

      const project = await Project.findOne({
        where: { id: projectId },
      });

      if (!project) {
        return next(ApiError.badRequest('Project not exist'));
      }
      const testKeyProject = await Project.findOne({ where: { key } });
      if (testKeyProject && (key !== project.key)) {
        return next(ApiError.badRequest('Project with that key already exist'));
      }
      const isLead = project.leadId === req.user.id;
      if (!isLead) {
        return next(ApiError.forbidden('Only lead user can edit project'));
      }

      deleteStaticFile(project.icon);
      const updatedProject = await project.update(
        { key, title, description, leadId, defaultAssigneeId, icon: filename });
      return res.json({ updatedProject });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { projectId } = req.params;
      const project = await Project.findOne({
        where: { id: projectId },
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

  async addMemberUser(req, res, next) {
    const { projectId, userId } = req.params;
    const projectMember = await ProjectMember.findOne(
      { where: { userId, projectId } });
    if (projectMember) {
      return next(ApiError.badRequest('Already a member'));
    }
    const project = await Project.findOne({ where: { id: projectId } });
    if (!project) {
      return next(ApiError.badRequest('Wrong project id'));
    }
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return next(ApiError.badRequest('Wrong user id'));
    }
    const isLead = project.leadId === req.user.id;
    if (!isLead) {
      return next(ApiError.forbidden('Only lead user can add member to project'));
    }
    const resource = await ProjectMember.create({
      userId: userId,
      projectId: projectId
    });
    res.json({ resource });
  }
}

module.exports = new ProjectController();
