const ApiError = require('../error/ApiError');
const { ProjectMember, Project, Issue } = require('../models/models');

module.exports = async function (req, res, next) {
  try {
    const { projectId, issueId } = req.params;

    if (projectId) {
      const projectMember = await ProjectMember.findOne({
        where: { projectId, userId: req.user.id }
      });
      if (projectMember) {
        req.user.roles.push('MEMBER');
      }

      const project = await Project.findOne({ where: { id: projectId } });
      const isLead = project.leadId === req.user.id;
      if (isLead) {
        req.user.roles.push('LEAD');
      }
    }

    if (issueId) {
      const issue = await Issue.findOne({
        where: { id: issueId }, include: { model: Project, as: 'project' }
      });
      const projectMember = await ProjectMember.findOne({
        where: { projectId: issue.projectId, userId: req.user.id }
      });
      if (projectMember) {
        req.user.roles.push('MEMBER');
      }

      const isLead = issue.project.leadId === req.user.id;
      if (isLead) {
        req.user.roles.push('LEAD');
      }

      const isAssignee = issue.assigneeId === req.user.id;
      if (isAssignee) {
        req.user.roles.push('ASSIGNEE');
      }

      const isReporter = issue.reporterId === req.user.id;
      if (isReporter) {
        req.user.roles.push('REPORTER');
      }
    }

    next();
  } catch (e) {
    return next(ApiError.internal(e.message));
  }
};
