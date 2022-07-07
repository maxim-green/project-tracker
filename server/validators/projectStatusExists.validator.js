const { Status } = require('../models/models');

module.exports = (statusId, {req}) => {
  const { projectId } = req.params;

  return Status.findOne({ where: { id: statusId, projectId } }).then(project => {
    if (!project) return Promise.reject(`Status ${statusId} not exist in ${projectId}`);
  })
};
