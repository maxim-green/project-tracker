const { User } = require('../models/models');

module.exports = userId => {
  return User.findOne({where: {id: userId}}).then(user => {
    if (!user) return Promise.reject('User not exist')
  })
};
