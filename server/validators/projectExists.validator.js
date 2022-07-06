const { Project } = require('../models/models');

module.exports = projectId => {
  return Project.findOne({where: {id: projectId}}).then(project => {
    if (!project) return Promise.reject('Project not exist.')
  })
};
