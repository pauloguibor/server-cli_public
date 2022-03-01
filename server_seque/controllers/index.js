const urlController = require('./url.controllers.js');
const userController = require('./user.controllers.js')
const login = require('./auth.controllers.js')
const userRamdomUrl = require('./url_ramdom.controllers')

module.exports = {
    url:urlController,
    user:userController,
    login:login,
    url_ramdom:userRamdomUrl
}