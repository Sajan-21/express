const express = require('express');
const router = express.Router;
const controller = require('../userControllers/userControllers')

router.post('/submit',controller.addUser);

exports.module = router;