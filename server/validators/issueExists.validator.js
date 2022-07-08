const { Issue } = require('../models/models');

module.exports = issueId => {
  return Issue.findOne({where: {id: issueId}}).then(issue => {
    if (!issue) return Promise.reject('Issue not exist.')
  })
};
