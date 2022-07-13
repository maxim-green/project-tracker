const { Tag } = require('../models/models');

module.exports = tagId => {
  return Tag.findOne({where: {id: tagId}}).then(tag => {
    if (!tag) return Promise.reject('Tag not exist.')
  })
};
