// routes/jokeRoutes.js

const express = require('express');
const router = express.Router();
const jokeController = require('../app/Controllers/jokesController');

router.post('/jokes', jokeController.createJoke);
router.get('/jokes', jokeController.getJokes);
router.put('/jokes/:id', jokeController.updateJoke);
router.delete('/jokes/:id', jokeController.deleteJoke);

module.exports = router;
