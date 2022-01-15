const config = require('../../../knexfile')
const knex = require('knex')(config)
const Restaurants = () => knex('restaurant')
module.exports = Restaurants