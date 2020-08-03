'use strict';

const Router = require('express');
const personRepo = require('../repo/personRepository');
const fs = require('fs');

const getPersonRoutes = app => {
  const router = new Router();

  router
    .get('/get/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const result = personRepo.getById(id);
      res.send(result);
    })
    .get('/getspecial', (req, res) => {
      let rawdata = fs.readFileSync('/api/special.json');
      let special = JSON.parse(rawdata);
      res.send(special);
    })
    .get('/removespecial', (req, res) => {
      fs.unlinkSync('/api/special.json');
      let special = JSON.stringify({"response": "deleted"});
      res.send(special);
    })
    .get('/savespecial', (req, res) => {
      let person_special = {
        "id" : 1,
        "firstName" : "SPECIALFN1",
        "lastName":"SPECIALLN1",
        "email":"specialemail1@email.na"
      };
      
      let data = JSON.stringify(person_special);
      fs.writeFileSync('/api/special.json', data);
      res.send(person_special);
    })
    .get('/all', (req, res) => {
      const result = personRepo.getAll();
      res.send(result);
    })
    .get('/remove', (req, res) => {
      personRepo.remove();
      const result = 'Last person remove. Total count: ' + personRepo.persons.size;
      res.send(result);
    })
    .post('/save', (req, res) => {
      const person = req.body;
      const result = personRepo.save(person);
      res.send(result);
    });

  app.use('/person', router);
};

module.exports = getPersonRoutes;
