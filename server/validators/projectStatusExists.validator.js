const { Status, Issue, Project } = require('../models/models');

module.exports = (statusId, {req}) => {
  const { projectId, issueId } = req.params;

  if (projectId) {
    return Status.findOne({ where: { id: statusId, projectId } }).then(status => {
      if (!status) return Promise.reject(`Status ${statusId} not exist in this project.`);
    })
  }

  if (issueId) {
    return Issue.findOne({
      where: { id: issueId }, include: { model: Project, as: 'project' }
    }).then(issue => {
      return Status.findOne({ where: { id: statusId, projectId: issue.project.id } })
    }).then(status => {
      if (!status) return Promise.reject(`Status ${statusId} not exist in this project.`);
    })
  }
};
