const ApiError = require('../error/ApiError');
const { ProjectMember, Project } = require('../models/models');

module.exports = async function (req, res, next) {
  try {
    const { projectId, issueId } = req.params;  // todo: add issue roles

    const projectMember = await ProjectMember.findOne({
      where: { projectId, userId: req.user.id }
    });
    if (projectMember) {
      req.user.roles.push('MEMBER');
    }

    const project = await Project.findOne({ where: { id: projectId }});
    const isLead = project.leadId === req.user.id;
    if (isLead) {
      req.user.roles.push('LEAD');
    }

    next();
  } catch (e) {
    return next(ApiError.internal(e.message));
  }
};
