const { Project } = require('../models/models');

module.exports = (key, {req}) => {
  const { projectId } = req.params;

  return Project.findOne({ where: { key } }).then(project => {
    const isUpdating = project?.id.toString() === projectId
    if (project && !isUpdating) return Promise.reject('Project key must be unique')
  })
};
