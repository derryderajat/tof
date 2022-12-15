module.exports = (app) => {
  const simulacra = require('../controllers/index.js');

  var router = require('express').Router();

  // Create a new Tutorial
  router.post('/', simulacra.create);

  // Retrieve all simulacra
  router.get('/', simulacra.findAllPreview);

  // // Retrieve all published simulacra
  // router.get('/published', simulacra.findAllPublished);

  // // Retrieve a single Simulacra with id
  router.get('/:name', simulacra.findOne);

  // // Update a Tutorial with id
  router.put('/:name', simulacra.update);

  // // Delete a Tutorial with id
  router.delete('/:name', simulacra.delete);

  // // Delete all simulacra
  // router.delete('/', simulacra.deleteAll);

  app.use('/api/simulacra', router);
};
