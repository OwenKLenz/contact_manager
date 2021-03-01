const FormPageMixin =  {
  tagExists(tagName) {
    return [...this.tagContainer.children].some(tag => {
      return tag.innerText === tagName;
    });
  },

  refresh(data) {
    this.container.innerHTML = Templates.contactFormTemplate(data);
    this.form = document.getElementById('contactForm');
    this.tagContainer = document.getElementById('tagContainer');
  },

  createTag(tagName) {
    let newTag = Templates.tagsPartial([tagName]);
    this.tagContainer.insertAdjacentHTML('beforeend', newTag);
  },

  gatherTags() {
    let tags = [];

    [...this.tagContainer.children].forEach(tag => {
      tags.push(tag.dataset.tagname); 
    });

    return tags.join(',');
  },

  hide() {
    this.container.classList.add('hidden');
  },
}

class HomePage {
  constructor() {
    this.container = document.getElementById('homePage');
    this.contactsContainer = document.getElementById('contactsContainer');
    this.searchBar = document.getElementById('searchBar');
    this.selectedTags = document.getElementById('selectedTags');
    this.contactsList;
    this.show();
  }

  loadContacts() {
    return ContactRequestManager.getAllContacts().then(contacts => {
      this.contactsContainer.innerHTML = Templates.contactsTemplate({contacts});
      this.contactsList = this.assembleContactsList();
    });
  }

  assembleContactsList() {
    return [...this.contactsContainer.children].map(contact => {
      return new Contact(contact);
    });
  }

  tagNotSelected(tagName) {
    return [...this.selectedTags.children].every(tag => {
      return tag.innerText !== tagName;
    });
  }

  clearFilters() {
    this.selectedTags.innerText = '';
    this.searchBar.value = '';
  }

  show() {
    this.loadContacts().then(() => {
      this.clearFilters();
      this.container.classList.remove('hidden');
    });
  }

  hide() {
    this.container.classList.add('hidden');
  }
}

class AddContactPage {
  constructor() {
    this.container = document.getElementById('addContactPage');
    Object.assign(AddContactPage.prototype, FormPageMixin);
    this.hide();
  }

  show() {
    this.refresh();
    this.container.classList.remove('hidden');
  }
}

class EditContactPage {
  constructor(contactId) {
    this.container = document.getElementById('editContactPage');
    Object.assign(EditContactPage.prototype, FormPageMixin);
    this.hide();
  }

  load(id) {
    return ContactRequestManager.getContact(id)
      .then(data => {
        this.refresh(data);
      });
  }

  show(id) {
    this.load(id).then(() => {
      this.container.classList.remove('hidden');
    });
  }
}
