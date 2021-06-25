const express = require('express');
const router = express.Router();
const sliders = require('../contollers/slider');

router.get('/', (req, res) => sliders.get(req, res));

router.post('/', (req, res) => sliders.create(req, res));

router.delete('/:id', (req, res) => sliders.update(req, res));

module.exports = router;

