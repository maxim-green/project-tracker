const { IssueTag, Tag } = require('../models/models');

module.exports = (_, { req }) => {
  let { tagId, issueId } = req.params;
  const { title } = req.body;

  if (title) {
    return Tag.findOne({ where: { title } })
      .then(tag => IssueTag.findOne({ where: { issueId, tagId: tag.id } }))
      .then(issueTag => {
        if (!issueTag) return Promise.reject(
          `Issue ${issueId} dont have tag ${tagId}`
        );
      });
  }

  if (tagId) {
    return IssueTag.findOne({ where: { issueId, tagId } })
      .then(issueTag => {
        if (!issueTag) return Promise.reject(
          `Issue ${issueId} dont have tag ${tagId}`
        );
      });
  }


};
