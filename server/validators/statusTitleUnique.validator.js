const { Status } = require('../models/models');

module.exports = (title) => {
  return Status.findOne({ where: { title } }).then(status => {
    if (status) return Promise.reject('Status title must be unique')
  })
};
