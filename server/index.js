require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())

// Middleware set up for use
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

// Middleware set up in CheckforSession. Calling it forward
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

// SWAG
app.get('/api/swag', swagController.read)

// CRUD END POINTS FOR AUTHENICATION
app.get('/api/user', authController.getUser)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)

// END POINTS FOR CHART
app.post('/api/cart', cartController.checkout)
app.post('/api/cart', cartController.add)
app.post('/api/chart/:id', cartController.delete)

// END POINT FOR SEARCH
app.get('/api/search', searchController.search)

app.listen(SERVER_PORT, () => console.log(`REVENGE OF THE PORT ${SERVER_PORT}`))