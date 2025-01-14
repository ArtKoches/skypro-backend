const router = require('express').Router()
const { welcomeToLibrary } = require('../controllers/main')

router.get('/', welcomeToLibrary)

module.exports = router