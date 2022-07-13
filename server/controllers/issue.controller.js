const ApiError = require('../error/ApiError');
const { Issue, Project, Status, IssueTag, User, Tag, Attachment } = require('../models/models');
const { saveStaticFile } = require('../utils/files');

class IssueController {
  async create(req, res, next) {
    try {
      const { projectId } = req.params;
      const {
        title,
        description,
        parentIssueId,
        statusId,
        assigneeId,
        reporterId,
      } = req.body;
      let {attachments} = req.files || {};

      const project = await Project.findOne({ where: { id: projectId } });
      const projectStatus = await Status.findOne({ where: { projectId } });
      const issuesCount = await Issue.count({ where: { projectId }, paranoid: false });

      const issue = await Issue.create({
        title,
        description,
      });
      issue.key = issuesCount + 1;
      issue.setProject(projectId);
      issue.setStatus(statusId || projectStatus.id);
      issue.setAssignee(assigneeId || project.defaultAssigneeId);
      issue.setReporter(reporterId || req.user.id);
      if (parentIssueId) issue.setParentIssue(parentIssueId);
      issue.save();

      let responseAttachments = [];
      if (attachments && !Array.isArray(attachments)) {
        attachments = [attachments]
      }
      if (attachments && Array.isArray(attachments)) {
        for (let attachmentFile of attachments) {
          const fileUrl = await saveStaticFile(attachmentFile, 'attachment');
          responseAttachments.push(
            await Attachment.create({userId: req.user.id, issueId: issue.id, fileUrl })
          )
        }
      }

      res.json({ ...issue.dataValues, attachments: responseAttachments });
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
          },
          {
            model: Tag,
            as: 'tags',
            attributes: { exclude: ['projectId'] },
            through: {attributes: []}
          }
        ],
        attributes: { exclude: ['reporterId', 'assigneeId', 'statusId'] }
      });

      return res.json(issue);
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

  async addTag(req, res) {
    const {issueId, tagId} = req.params;
    const { title } = req.body;

    if (tagId) {
      const issueTag = await IssueTag.create({issueId, tagId});
      return res.json({issueTag});
    }

    if (title) {
      res.json({issueId, title});
    }
  }

  async deleteTag(req, res, next) {
    try {
      const {issueId, tagId} = req.params;
      const deletedIssueTagCount = await IssueTag.destroy({
        where: { tagId, issueId },
      });
      return res.json(deletedIssueTagCount);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new IssueController();
