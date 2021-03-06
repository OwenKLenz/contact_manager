const path = require('path');
const stringify = require('json-beautify');

const db = require('../data');

let dataFile = 'contacts.json';

if (process.env.NODE_ENV === 'test') dataFile = 'contacts_test.json';
const DATA_PATH = path.join(__dirname, `../data/${dataFile}`);

const contactManager = {
  getAll: function(cb) {
    return db.any("SELECT * FROM contacts;")
      .then(rows => {
        return rows;
      });
  },

  get: function(contactId) {
    contactId = Number(contactId);

    return db.one(`SELECT * FROM contacts WHERE id = ${contactId}`)
      .then(contact => {
        return contact;
      });
  },

  add: function(contact) {
    if (!contact['full_name']) return false;

    const q = 
      "INSERT INTO contacts (full_name, email, phone_number, tags) VALUES (${full_name}, ${email}, ${phone_number}, ${tags})";

    return db.query(q, {...contact}).then(newContact => {
      return newContact;
    })
  },

  remove: function(contactId) {
    contactId = Number(contactId);

    q = "DELETE FROM contacts WHERE id = ${contactId}";

    return db.query(q, {contactId})
      .then(result => {
        return result;
      })
  },

  update: function(contactId, contactAttrs) {
    contactId = Number(contactId);

    q = "UPDATE contacts SET full_name = ${full_name}, email = ${email}, phone_number = ${phone_number}, tags = ${tags} WHERE id = ${contactId}";

    return db.query(q, {...contactAttrs, contactId})
      .then(contact => {
        return contact
      })
  },

  generateId: function() {
    let collection = this.getAll();

    var maxId = collection.reduce(function(prevMax, contact) {
      return contact.id > prevMax ? contact.id : prevMax;
    }, 0);

    return maxId + 1;
  },

  createContact: function(contact) {
    let newContact = Object.assign(
      {
        full_name: null,
        phone_number: null,
        email: null,
        tags: null
      },
      { id: this.generateId() },
      contact
    );
    return newContact;
  }
};
module.exports = contactManager;
