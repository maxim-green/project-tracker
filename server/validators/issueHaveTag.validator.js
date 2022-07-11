const { IssueTag } = require('../models/models');

module.exports = (_, {req}) => {
  const {tagId, issueId} = req.params;

  return IssueTag.findOne({where: {issueId, tagId}}).then(issueTag => {
    if (!issueTag) return Promise.reject(`Issue ${issueId} dont have tag ${tagId}`);
  })
};
