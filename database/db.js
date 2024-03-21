const sequelize = require('sequelize')
// const mysql2 = require('mysql2')

let dbConnection = new sequelize.Sequelize('acte', 'root', '236084', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

// console.log('dbConnection db ::::::', dbConnection)

module.exports = dbConnection 