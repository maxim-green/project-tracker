const { Issue } = require('../models/models');

module.exports = (key, {req}) => {
  const { issueId } = req.params;

  return Issue.findOne({ where: { key } }).then(issue => {
    const isUpdating = issue?.id.toString() === issueId
    if (issue && !isUpdating) return Promise.reject('Issue key must be unique')
  })
};
