const { saveStaticFile } = require('../utils/files');
const { Attachment } = require('../models/models');

class AttachmentController {
  async create(req, res) {
    const {issueId} = req.params;
    let {attachments} = req.files;

    let responseAttachments = [];
    if (!Array.isArray(attachments)) {
      attachments = [attachments]
    }
    if (Array.isArray(attachments)) {
      for (let attachmentFile of attachments) {
        const fileUrl = await saveStaticFile(attachmentFile, 'attachment');
        responseAttachments.push(
          await Attachment.create({userId: req.user.id, issueId, fileUrl })
        )
      }
    }

    res.json(responseAttachments);
  }
  async getByIssueId(req, res) {
    const {issueId} = req.params;
    const attachments = await Attachment.findAll({where: {issueId}});
    res.json(attachments);
  }
  async delete(req, res) {
    const {attachmentId} = req.params;
    const deleteCount = await Attachment.destroy({where: {id: attachmentId}});
    res.json(deleteCount);
  }
}

module.exports = new AttachmentController();
