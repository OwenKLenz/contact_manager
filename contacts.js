const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const contactManager = require('./lib/contact_manager');
const helpers = require('./lib/helpers');

function logger(request) {
  console.log(request.method, request.url);
  request.next();
}

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.get('/api/contacts', (req, res) => {
  contactManager.getAll()
    .then(contacts => {
      return res.json(contacts)
    });
});

app.get('/api/contacts/:id', (req, res) => {
  contactManager.get(req.params['id'])
    .then(contact => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
});

app.post('/api/contacts', (req, res) => {
  let contactAttrs = helpers.extractContactAttrs(req.body);

  contactManager.add(contactAttrs)
    .then(contact => {
      if (contact) {
        res.status(201).send(contact);
      } else {
        res.status(400).end();
      }
    })
});

app.put('/api/contacts/:id', (req, res) => {
  let contactAttrs = helpers.extractContactAttrs(req.body);

  contactManager.update(req.params['id'], contactAttrs)
    .then(contact => {
      if (contact) {
        res.status(201).send(contact);
      } else {
        res.status(400).end();
      }
    })
});

app.delete('/api/contacts/:id', (req, res) => {
  contactManager.remove(req.params['id'])
    .then(result => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(400).end();
      }
    })
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

module.exports = app; // for testing
