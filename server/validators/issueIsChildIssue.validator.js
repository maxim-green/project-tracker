const { Issue } = require('../models/models');

module.exports = issueId => {
  return Issue.findOne({where: {id: issueId}}).then(issue => {
    if (!issue?.parentIssueId) return Promise.reject('Issue is not child issue')
  })
};
