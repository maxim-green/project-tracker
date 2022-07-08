const ApiError = require('../error/ApiError');
const { Issue, Project, Status } = require('../models/models');
const { User } = require('../models/models');

class IssueController {
  async create(req, res, next) {
    try {
      const { projectId } = req.params;
      const {
        title,
        description,
        attachments,
        parentIssueId,
        statusId,
        assigneeId,
        reporterId,
      } = req.body;

      const project = await Project.findOne({ where: { id: projectId } });
      const projectStatus = await Status.findOne({ where: { projectId } });
      const issuesCount = await Issue.count({ where: { projectId } });

      const issue = await Issue.create({
        title,
        description,
      });
      issue.key = `${project.key}-${issuesCount + 1}`;
      issue.setProject(projectId);
      issue.setStatus(statusId || projectStatus.id);
      issue.setAssignee(assigneeId || project.defaultAssigneeId);
      issue.setReporter(reporterId || req.user.id);
      if (parentIssueId) issue.setParentIssue(parentIssueId);
      issue.save();

      res.json(issue);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async get(req, res, next) {
    try {
      const { issueId } = req.params;

      const issue = await Issue.findOne({
        where: { id: issueId },
        include: [
          { model: User,
            as: 'assignee',
            attributes: { exclude: ['password'] }
          },
          {
            model: User,
            as: 'reporter',
            attributes: { exclude: ['password'] }
          },
          {
            model: Status,
            as: 'status',
          }
        ],
        attributes: { exclude: ['reporterId', 'assigneeId', 'statusId'] }
      });

      return res.json({ issue });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getByProjectId(req, res) {
    const { projectId } = req.params;
    const issues = await Issue.findAll({ where: { projectId } });
    res.json(issues);
  }

  async update(req, res, next) {
    try {
      const {
        title,
        description,
        statusId,
        assigneeId,
        reporterId,
      } = req.body;
      const {issueId} = req.params;

      const issue = await Issue.findOne({ where: { id: issueId }});

      const updatedIssue = await issue.update(
        { title, description, statusId, assigneeId, reporterId });

      res.json(updatedIssue);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async delete(req, res) {
    try {
      const {issueId} = req.params;
      const issue = await Issue.destroy({
        where: { id: issueId },
      });
      return res.json(issue);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getRelatedComments(req, res) {

  }

  async getRelatedTags(req, res) {

  }

  async addTag(req, res) {

  }

  async deleteTag(req, res) {

  }

  async getRelatedAttachments(req, res) {

  }
}

module.exports = new IssueController();
