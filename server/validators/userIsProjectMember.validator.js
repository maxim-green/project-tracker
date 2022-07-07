const { ProjectMember } = require('../models/models');

module.exports = (userId, { req }) => {
  const { projectId } = req.params;
  return ProjectMember.findOne({ where: { userId, projectId } }).then(projectMember => {
    if (!projectMember) return Promise.reject(`User ${userId} is not member of project ${projectId}`);
  });
};
