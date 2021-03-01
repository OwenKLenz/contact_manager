class Templates {
  static createTemplates() {
    let templates = [...document.querySelectorAll('[type="x-handlebars-template"]')];
    let partials = [...document.querySelectorAll('[type="x-handlebars-template-partial"]')];

    templates.forEach(template => {
     this[template.id] = Handlebars.compile(template.innerHTML); 
    });

    partials.forEach(partial => {
      this[partial.id] = Handlebars.compile(partial.innerHTML); 

      Handlebars.registerPartial(partial.id, document.getElementById(partial.id).innerHTML);
    });
  }
}

class UtilityMethods {
  static searchMatch(contact, text) {
    let regexp = new RegExp(text, 'i');
    return regexp.test(contact.fullName);
  }

  static processTags(contact) {
    if (contact.tags) {
      contact.tags = contact.tags.split(',');
    } else {
      contact.tags = [];
    }
    
    return contact;
  }
}

class ContactRequestManager {
  static addContact(data) {
    return AJAXRequests.post('api/contacts', data);
  }

  static getContact(id) {
    return AJAXRequests.get('api/contacts/' + id)
      .then(response => response.json())
      .then(UtilityMethods.processTags);
  }

  static getAllContacts() {
    return AJAXRequests.get('api/contacts')
      .then(response => response.json())
      .then(contacts => contacts.map(UtilityMethods.processTags));
  }

  static updateContact(data) {
    return AJAXRequests.put('api/contacts/' + data.id, data);
  }

  static removeContact(id) {
    return AJAXRequests.remove('api/contacts/' + id);
  }
}
