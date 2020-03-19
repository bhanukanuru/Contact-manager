const express = require('express')
const router = express.Router()

const usersController = require('../app/controllers/usersController')
const authenticateUser = require('../app/middleware/authenticateUser')
const contactController = require('../app/controllers/contactsController')



router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)

router.post('/contact', authenticateUser, contactController.create)
router.get('/contact', authenticateUser, contactController.list)
router.get('/contact/:id', authenticateUser, contactController.show)
router.put('/contact/:id', authenticateUser, contactController.update)
router.delete('/contact/:id', authenticateUser, contactController.destroy)





module.exports = router