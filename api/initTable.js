/***
 * This class is a development assistant tool used to create database tables.
 * It should only be used in the development environment and should not be used in the production environment.
 * Note: This class will delete all tables and create new ones, causing all data to be lost. Please use with caution.
 */
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })


const User = require('./src/users/userModel.js')
User.sync({ force: true }).then(() => {
    console.log('Table created successfully')
}).catch((error) => {
    console.error('Error creating table:', error)
})
