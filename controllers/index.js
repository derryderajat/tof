const db = require('../models');
// const weapon = db.weapon;
const { Simulacra, Weapon } = db.simulacra;
const mongoose = require('mongoose');
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a simulacra
  const simulacra = new Simulacra({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    previewIMG: req.body.previewIMG,
    prototype: req.body['prototype'],
    rank: req.body.rank,
    awaken: req.body.awaken,
    advancement: req.body.advancement,
    voiceActors: req.body.voiceActors,
  });
  const weapon = new Weapon({
    _id: mongoose.Types.ObjectId(),
    owner: simulacra._id,
    nameWeapon: req.body.nameWeapon,
    imgWeapon: req.body.imgWeapon,
    resonance: req.body.resonance,
    element: req.body.element,
    shatter: req.body.shatter,
    charge: req.body.charge,
    statRankUP: req.body.statRankUP,
  });
  simulacra.weapon = weapon._id;
  // Save Simulacra in the database
  simulacra.save(simulacra);

  weapon
    .save(weapon)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Simulacra.',
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAllPreview = (req, res) => {
  Simulacra.find({})
    .select('_id name previewIMG')
    .lean()
    .populate('weapon', 'resonance element')
    .then((data) => {
      let result = data.map((e) => ({
        ...e,
        resonance: e.weapon.resonance,
        element: e.weapon.element,
      }));
      result.forEach(function (v) {
        delete v.weapon;
      });

      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving simulacra.',
      });
    });
};

// // Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const name = req.params.name;
  Simulacra.findOne({ name: name })
    .populate('weapon')
    .then((data) => {
      // result.concat(data);

      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || 'Some error occurred while retrieving simulacra.',
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const name = req.params.name;
  //Update
  const simulacra = {
    // _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    previewIMG: req.body.previewIMG,
    prototype: req.body['prototype'],
    rank: req.body.rank,
    awaken: req.body.awaken,
    advancement: req.body.advancement,
    voiceActors: req.body.voiceActors,
  };
  const weapon = {
    // _id: req.body.IDWeapon,
    // owner: simulacra._id,
    nameWeapon: req.body.nameWeapon,
    imgWeapon: req.body.imgWeapon,
    resonance: req.body.resonance,
    element: req.body.element,
    shatter: req.body.shatter,
    charge: req.body.charge,
    statRankUP: req.body.statRankUP,
  };
  // simulacra.weapon = weapon._id;
  // Save Simulacra in the database
  Simulacra.findOneAndUpdate(
    { name: name },
    simulacra,
    { runValidators: true, useFindAndModify: false },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        // console.log('Original Doc : ', docs);
        Weapon.findOneAndUpdate(
          { nameWeapon: weapon.nameWeapon },
          weapon,
          { runValidators: true, useFindAndModify: false },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              // console.log('Original Doc : ', docs);

              res.status(201).send({ status: 'success update' });
            }
          }
        );
      }
    }
  );
};

// // Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const name = req.params.name;

  Simulacra.findOneAndDelete({ name: name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted Simulacra : ', docs);
      Weapon.findOneAndDelete({ owner: docs._id }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Deleted Weapon : ', docs);

          res.status(204).send({ status: 'resource deleted successfully' });
        }
      });
    }
  });
};

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {};

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {};
