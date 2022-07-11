const { Tag, Issue, Project } = require('../models/models');

module.exports = (tagId, {req}) => {
  const { projectId, issueId } = req.params;

  if (projectId) {
    return Tag.findOne({ where: { id: tagId, projectId } }).then(tag => {
      if (!tag) return Promise.reject(`Tag ${tagId} not exist in this project.`);
    })
  }

  if (issueId) {
    return Issue.findOne({
      where: { id: issueId }, include: { model: Project, as: 'project' }
    }).then(issue => {
      return Tag.findOne({ where: { id: tagId, projectId: issue.project.id } })
    }).then(tag => {
      if (!tag) return Promise.reject(`Tag ${tagId} not exist in this project.`);
    })
  }
};
