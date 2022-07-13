const { Attachment } = require('../models/models');

module.exports = attachmentId => {
  return Attachment.findOne({where: {id: attachmentId}}).then(attachment => {
    if (!attachment) return Promise.reject('Attachment not exist.')
  })
};
