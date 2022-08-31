"use strict"

module.exports = (app)=>{
    const indexController = require('./IndexController')
    app.route('/api/leads').get(indexController.get_leads)
}