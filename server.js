// const http = require("http")

// const host = 'localhost'
// const port = 8082

// const books = JSON.stringify([
//     { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
//     { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
// ])

// console.log('books ::::', books)

// const authors = JSON.stringify([
//     { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
//     { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
// ])

// const callback = function (req, res) {
//     res.setHeader("Content-Type", "application/json")
//     console.log('req :::::', req.url)
//     switch (req.url) {
//         case "/books":
//             res.writeHead(200)
//             res.end(books)
//             break
//         case "/authors":
//             res.writeHead(200)
//             res.end(authors)
//             break
//         case "/ContactUs":
//             res.writeHead(200)
//             res.end('Contact Us')
//             break
//         default:
//             res.writeHead(200)
//             res.end('Home Page')
//     }
// }

// const server = http.createServer(callback);

// // console.log('server :::::', server)

// server.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });

const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('sequelize')
// const dbConnection = require('./database/db')
// const User = require('./models/user')

const app = new express()  // This create the object of express.

app.listen(4000, ()=>{
    console.log('Server is Started at Port number 4000.')
})

app.use(bodyParser.json())

let dbConnection = new sequelize.Sequelize('acte', 'root', '236084', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

// making the connection
dbConnection.authenticate().then(()=>{
    console.log('Database Connection has been Established on local System.')
}).catch((error)=>{
    console.log('error in connecting to database in local System.')
})

// defining the structure of tables
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

// creating the table
dbConnection.sync().then((result)=>{
    console.log('Table has been synced Successfully.')
}).catch((error)=>{
    console.log('error in syncing the table.', error)
})

app.get('/', (req, res)=>{
    res.status(200).send('Server is Started At Port No 4000.')
})

app.get('/home', (req, res)=>{
        console.log('req.name ::', req.query)
        res.status(200).send('Welcome into get Home Page')
    })

app.post('/home', bodyParser.json(), (req, res)=>{//body-parser
    console.log('req.body ::::', req.body)
    // console.log('req.query ::::', req.query)
    res.status(200).send('Welcome into post Home Page.')
})

// req = {
//     x: 'x',
//     y: 'y',
//     z: 'z',
//     body: {

//     }
// }

function userCheckField(req, res, next){
    let user_first_name = req.body.first_name
    let user_last_name = req.body.last_name
    let user_city = req.body.city
    let user_phone_number = req.body.phone_number
    let user_email = req.body.email

    if(user_first_name == undefined){
        return res.status(400).json({
            successCode: 0,
            error: 'User First Name is required'
        })
    }
    if(user_last_name == undefined){
        return res.status(400).json({
            successCode: 0,
            error: 'User last_name Name is required'
        })
    }

    if(user_city == undefined){
        return res.status(400).json({
            successCode: 0,
            error: 'User user_city Name is required'
        })
    }

    if(user_email == undefined){
        return res.status(400).json({
            successCode: 0,
            error: 'User user_email Name is required'
        })
    }

    if(user_phone_number == undefined){
        return res.status(400).json({
            successCode: 0,
            error: 'User user_phone_number is required'
        })
    }

    next()
}

app.post('/user', userCheckField, (req, res)=>{

    console.log('Hi, we have came to the final or main Function.')

    let user_first_name = req.body.first_name
    let user_middle_name = req.body.middle_name
    let user_last_name = req.body.last_name
    let user_city = req.body.city
    let user_phone_number = req.body.phone_number
    let user_email = req.body.email

    User.create({
        first_name: user_first_name,
        middle_name: user_middle_name,
        last_name: user_last_name,
        phone_number: user_phone_number,
        city: user_city,
        email: user_email
    }).then((result)=>{
        // console.log('result ::::', result)
        // 201 indicating for creating the new resource
        res.status(201).json({
            successCode: 1,
            message: 'Data has been Stored Successfully.',
            data: result
        })
    }).catch((error)=>{
        console.log('error in storing the user details ::::', error)
        res.status(500).json({
            success: 0,
            error: error
        })
    })
})

app.get('/user', function(req, res){

    let city = req.query.city

    User.findAll({
        // where: {
        //     first_name: name,
        //     city: city
        // },
        logging: true
    }).then((result)=>{
        // console.log('fetched data :::::', result)
        res.status(200).json({
            success: 1,
            data: result
        })
    }).catch((error)=>{
        console.log('error in fetching the data :::::', error)
        res.status(500).json({
            success: 0,
            error: error.message
        })
    })
})

app.put('/user/:adhnchsdbnch', (req, res)=>{
    let uniqueId = req.params.adhnchsdbnch

    let name = req.query.name

    /* update(obj1, obj2) obj1 refer new updating information, obj2 refer which record to be update*/
    User.update({
        first_name: name,
        city: 'New Delhi'
    },{
        where: {
            id: uniqueId
        }
    }).then((result)=>{
        console.log('result ::::', result)
        res.status(201).json({
            success: 1,
            data: result
        })
    }).catch((error)=>{
        console.log('error in updating the records ::::', error)
        res.status(500).json({
            success: 0,
            error: error.message
        })
    })
})

app.delete('/user/:id',/*middleware*/ (req, res)=>{
    let userId = req.params.id

    //here

    User.findOne({
        where: {
            id: userId
        }
    }).then((userInfo)=>{
        if(userInfo == null){
            return res.status(404).json({
                success: 0,
                error: 'User does not Exist.'
            })
        }
        User.destroy({
            where: {
                id: userId
            }
        }).then((result)=>{
            User.create({

            }).then((result)=>{
                User.findAll().then((rest)=>{
                    
                })
            }).catch((error)=>{

            })
            res.status(200).json({
                success: 1,
                data: result
            })
        }).catch((error)=>{
            res.status(500).json({
                success: 0,
                error: error.message
            })
        })
    })
})
// app.post()
// app.put()
// app.delete()





























// const books = JSON.stringify([
//     { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
//     { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
// ]);

// const authors = JSON.stringify([
//     { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
//     { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
// ]);

// const requestListener = function (req, res) {
//     res.setHeader("Content-Type", "application/json");
//     switch (req.url) {
//         case "/books":
//             res.writeHead(200);
//             res.end(books);
//             break
//         case "/authors":
//             res.writeHead(200);
//             res.end(authors);
//             break
//         default:
//             res.writeHead(200)
//             res.end('Home Page')
//     }
// }