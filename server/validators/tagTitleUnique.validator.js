const { Tag } = require('../models/models');

module.exports = (title) => {
  return Tag.findOne({ where: { title } }).then(tag => {
    if (tag) return Promise.reject('Tag title must be unique')
  })
};
