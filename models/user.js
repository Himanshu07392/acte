const sequelize = require('sequelize')
const dbConnection = require('../database/db')

const User = dbConnection.define('user', {
    id: {
        type: sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
       type: sequelize.STRING,
       allowNull: false 
    },
    middle_name: {
        type: sequelize.STRING,
        allowNull: true
    },
    last_name:  {
        type: sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: sequelize.STRING,
        allowNull: false
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    }
})

module.exports = User 