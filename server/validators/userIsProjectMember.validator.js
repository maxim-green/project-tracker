const { ProjectMember } = require('../models/models');
const { Issue, Project } = require('../models/models');

module.exports = (userId, { req }) => {
  const { projectId, issueId } = req.params;

  if (projectId) {
    return ProjectMember.findOne({ where: { userId, projectId } }).then(projectMember => {
      if (!projectMember) return Promise.reject(`User ${userId} is not member of this project`);
    });
  }

  if (issueId) {
    return Issue.findOne({
      where: { id: issueId }, include: { model: Project, as: 'project' }
    }).then(issue => {
      return ProjectMember.findOne({ where: { userId, projectId: issue.project.id } })
    }).then(projectMember => {
      if (!projectMember) return Promise.reject(`User ${userId} is not member of this project`);
    })
  }

};
