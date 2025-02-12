/**
 * @api {get} /users Get all users
 * @apiName GetAllUsers
 * @apiGroup User
 * @apiSuccess {Object[]} users List of users.
 */

/**
 * @api {post} /users Create a new user
 * @apiName PostNewUser
 * @apiGroup User
 * @apiParam {String} username Username of the user.
 * @apiParam {String} email Email of the user.
 * @apiParam {String} password_hash Password of the user.
 * @apiSuccess {Object} user Created user object.
 * @apiError {String} message Error message.
 */

/**
 * @api {put} /users Update an existing user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiHeader {String} Authorization User's access token.
 * @apiParam {String} [username] Optional new username.
 * @apiParam {String} [email] Optional new email.
 * @apiParam {String} [password_hash] Optional new password.
 * @apiSuccess {Object} user Updated user object.
 * @apiError {String} message Error message.
 */

/**
 * @api {delete} /users Delete the authenticated user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiHeader {String} Authorization User's access token.
 * @apiSuccess {String} message Success message.
 * @apiError {String} message Error message.
 */

/**
 * @api {get} /users/token Check token validity
 * @apiName CheckToken
 * @apiGroup User
 * @apiHeader {String} Authorization User's access token.
 * @apiSuccess {String} message Success message.
 * @apiError {String} message Error message.
 */

/**
 * @api {get} /users/:user_id Get user by ID
 * @apiName GetUserById
 * @apiGroup User
 * @apiParam {Number} user_id User's unique ID.
 * @apiSuccess {Object} user User object.
 * @apiError {String} message Error message.
 */

/**
 * @api {delete} /users/:user_id Delete user as an admin
 * @apiName DeleteUserAsAdmin
 * @apiGroup User
 * @apiHeader {String} Authorization Admin's access token.
 * @apiParam {Number} user_id User's unique ID.
 * @apiSuccess {String} message Success message.
 * @apiError {String} message Error message.
 */
