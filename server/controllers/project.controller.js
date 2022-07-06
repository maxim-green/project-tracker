const { Project, ProjectMember, User, Status, Tag } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const saveStaticFile = (file) => {
  if (!file) return file
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

      const { icon } = req.files || {};
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

      const project = await Project.findOne({
        where: { id: projectId },
        include: [
          { model: User, as: 'lead', attributes: { exclude: ['password'] } },
          {
            model: User,
            as: 'defaultAssignee',
            attributes: { exclude: ['password'] }
          }
        ],
        attributes: { exclude: ['leadId', 'defaultAssigneeId'] }
      });

      return res.json({ project });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { key, title, description, leadId, defaultAssigneeId } = req.body;
      const { icon } = req.files || {};
      const filename = saveStaticFile(icon);
      const { projectId } = req.params;

      const project = await Project.findOne({ where: { id: projectId }});
      if (filename) deleteStaticFile(project.icon);
      const updatedProject = await project.update(
        { key, title, description, leadId, defaultAssigneeId, icon: filename });
      return res.json(updatedProject);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { projectId } = req.params;
      const project = await Project.destroy({
        where: { id: projectId },
      });
      return res.json(project);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getRelatedIssues(req, res) {

  }

  async getRelatedStatuses(req, res, next) {
    const { projectId } = req.params;
    const project = await Project.findOne({ where: { id: projectId } });
    if (!project) {
      return next(ApiError.badRequest('Project not exist'));
    }
    const statuses = await Status.findAll({where: {projectId}});
    res.json(statuses)
  }

  async getRelatedTags(req, res) {
    const { projectId } = req.params;
    const project = await Project.findOne({ where: { id: projectId } });
    if (!project) {
      return next(ApiError.badRequest('Project not exist'));
    }
    const tags = await Tag.findAll({where: {projectId}});
    res.json(tags)
  }

  async getLeadUser(req, res, next) {
    try {
      const { projectId } = req.params;
      const { lead } = await Project.findOne({
        include: { model: User, as: 'lead', attributes: { exclude: ['password'] } },
        where: { id: projectId }
      });
      res.json({ lead });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getMemberUsers(req, res, next) {
    try {
      const { projectId } = req.params;
      const members = (await ProjectMember.findAll({
        include: { model: User, attributes: { exclude: ['password'] } },
        where: { projectId }
      })).map(item => item.user);
      res.json({ members });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async addMemberUser(req, res, next) {
    try {
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
      const resource = await ProjectMember.create({
        userId: userId,
        projectId: projectId
      });
      res.json({ resource });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new ProjectController();
