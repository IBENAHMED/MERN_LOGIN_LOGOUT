// quoteRoutes.js
const express = require('express');
const { getQuote, postQuote } = require('../controllers/quoteController');
const router = express.Router();
const { authorize } = require('../middleware/authorize');
const rolesPermisson = require('../config/rolesPermisson');
const ROLE = require('../config/role');;

router.get('/quote', authorize, rolesPermisson(ROLE.ADMIN), getQuote);
router.post('/quote', authorize, rolesPermisson(ROLE.ADMIN), postQuote);

module.exports = router;
