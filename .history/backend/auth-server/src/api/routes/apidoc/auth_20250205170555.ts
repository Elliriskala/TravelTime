/**
 * @api {post} /login User login
 * @apiName Login
 * @apiGroup Auth
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password_hash Password of the user.
 * @apiSuccess {String} token JWT token.
 * @apiError {String} message Error message.
 */
