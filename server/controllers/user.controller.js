const ApiError = require('../error/ApiError');

class UserController {
  async registration(req, res) {

  }

  async login(req, res) {

  }

  async check(req, res, next) {
    const {id} = req.query;
    if (!id) {
      return next(ApiError.badRequest('Wrong id'))
    }
    return res.status(200).json({message: {id}})
  }

  async refreshTokens(req, res) {

  }

  async projectLead(req, res) {

  }

  async projectMember(req, res) {

  }

  async issueReporter(req, res) {

  }

  async issueAssignee(req, res) {

  }
}

module.exports = new UserController();

