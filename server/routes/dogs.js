const express = require('express');
const router = express.Router();
const db = require('../database/configs')
const Dog = db.dog;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;




router.get('/', (req, res) => {
  // 1.Retrieva all the data: find all dogs
  Dog.findAll().then(dogs => {
    res.status(200).send(dogs);
  });
});

router.get('/attributes', (req, res) => {
  // 2.Retrieve specific fields (i.e. id, names, dates, etc.)
  Dog.findAll({
    attributes: ['name', 'age'],
  }).then(function (dogs) {
    res.status(200).json(dogs);
  })
});


router.get('/contains', (req, res) => {
  // 3.1 A filter for data that contains... (e.g. name containing the string 'bro')
  Dog.findAll({
    where: {
      name: {
        [Op.like]: `%${req.query["name"]}%`
      }
    }
  }).then(function (dogs) {
    if (dogs.length === 0) {
      res.status(404).send(`no dog found which name contains ${req.query["name"]}`);
    }
    res.status(200).json(dogs);
  }).catch(function (error) {
    console.log(error);
  });
});

router.get('/starts', (req, res) => {
  // 3.2 A filter for data that starts with...
  Dog.findAll({
    where: {
      name: {
        [Op.like]: `${req.query["name"]}%`
      }
    }
  }).then(function (dogs) {
    if (dogs.length === 0) {
      res.status(404).send(`no dog found which name start with ${req.query["name"]}`);
    }
    res.status(200).json(dogs);
  }).catch(function (error) {
    console.log(error);
  });
});


router.get('/greater', (req, res) => {
  // 3.3 A filter for data that is greater than... (e.g. date greater than 18/10/2010)
  Dog.findAll({
    where: {
      arrivalDate: {
        [Op.gt]: req.query["arrivalDate"],
      }
    }
  }).then(function (dogs) {
    if (dogs.length === 0) {
      res.status(404).send(`no dog found which arrival date greater than ${req.query["arrivalDate"]}`);
    }
    res.status(200).json(dogs);
  }).catch(function (error) {
    console.log(error);
  });
});


router.get('/order/:orderby', (req, res) => {
  // 4. Ordered data recovery (i.e. ascending, descending) - The order should be passed as a route parameter
  Dog.findAll({
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['age', req.params.orderby]
    ]

  }).then(function (dogs) {

    res.status(200).json(dogs);
  }).catch(function (error) {
    console.log(error);
  });
});


router.post('/', (req, res) => {
  //5.POST - Insertion of a new entity
  Dog.create({ name: req.body.name, age: req.body.age, arrivalDate: req.body.arrivalDate, castrated: req.body.castrated }).then(dog => {
    console.log("dog's auto-generated ID:", dog.id);
    
  }).then(function (dog) {

    res.status(201).send("dog created");
  });

});

router.put('/:id', (req, res) => {
  //6.PUT - Modification of an entity
  Dog.update({
    name: req.body.name, age: req.body.age, arrivalDate: req.body.arrivalDate, castrated: req.body.castrated
  }, {
    where: {
      id: req.params.id
    }
  }).then(function (totUdates) {
    res.status(200).json(totUpdates);
  });

});

router.put('/:id/:castrated', (req, res) => {
  //7.PUT - Toggle a Boolean value
  Dog.update({
    castrated: req.params.castrated
  }, {
    where: {
      id: req.params.id
    }
  }).then(function (totUdates) {
    res.status(200).json(totUpdates);
  });

});



router.delete('/:id', (req, res) => {
  //8. DELETE - Delete an entity
  Dog.destroy({
    where: {
      id: req.params.id
    },
  }).then(function (deleted) {
    res.status(204).send(`dog with id ${req.params.id} is deleted`);
  });

});


router.delete('/notcastracted', (req, res) => {
  //8. DELETE - Delete an entity
  Dog.destroy({
    where: {
      castrated: false
    },
  }).then(function (deleted) {
    res.status(204).send(`dog with is deleted`);
  });

});





module.exports = router;

// {
//   "name": "Dana",
//   "arrivalDate": "2019-09-12T00:00:00.000Z",
//   "castrated": false,
//   "age": 11,
//   "createdAt": "2021-01-30T00:00:00.000Z",
//   "updatedAt": "2021-01-30T00:00:00.000Z"
// }