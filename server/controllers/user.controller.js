const ApiError = require('../error/ApiError');
const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email) => {
  return jwt.sign(
    {id, email},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    try {
      const {email, password, firstName, lastName} = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('Wrong e-mail or password'))
      }
      const candidate = await User.findOne({where: {email}});
      if (candidate) {
        return next(ApiError.badRequest('User with that e-mail already exists'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({
        email,
        password:
        hashPassword,
        firstName,
        lastName
      })
      const token = generateJwt(user.id, user.email);
      res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({where: {email}});
      if (!user) {
        return next(ApiError.badRequest('User with that email not exist'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.badRequest('Wrong e-mail or password'))
      }
      const token = generateJwt(user.id, user.email);
      return res.json({ token })
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email);
    return res.status(200).json({token})
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

