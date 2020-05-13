/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
var isAuthenticated = function (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    return res.redirected('/login')
  }
}

module.exports = isAuthenticated
