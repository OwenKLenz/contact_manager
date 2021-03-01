const EventCallbacksMixin = {
  loadAddPage() {
    this.showPage('add');
  },

  loadEditPage(event) {
    let id = event.target.parentNode.dataset.id;       
    this.showPage('edit', id);
  },

  deleteContact(event) {
    let id = event.target.parentNode.dataset.id;

    ContactRequestManager.removeContact(id).then(() => {
      this.showPage('home');
    });
  },

  filterByTag(event) {
    let tagName = event.target.innerText;

    if (this.homePage.tagNotSelected(tagName)) {
      let tagClone = event.target.cloneNode(true);

      this.homePage.selectedTags.prepend(tagClone);

      this.homePage.contactsList.forEach(contact => {
        if (!contact.hasTag(tagName)) {
          contact.hide(); 
        }
      });
    }
  },

  showAllContacts() {
    this.homePage.contactsList.forEach(contact => {
      contact.show();
    });

    this.homePage.searchBar.value = '';
    this.homePage.selectedTags.innerText = '';
  },

  cancelForm(event) {
    event.preventDefault();
    this.showPage('home');
  },

  createNewTag(page, event) {
    event.preventDefault();
    let tagName = event.target.previousElementSibling.value;

    if (tagName && !page.tagExists(tagName)) {
      page.createTag(tagName.toLowerCase());
      event.target.previousElementSibling.value = '';
    }
  },

  removeTag(event) {
    event.target.remove();
  },

  submitNewContact(event) {
    event.preventDefault();

    let data = {};
    let formData = new FormData(event.target);

    [...formData.entries()].forEach(nameValue => {
      data[nameValue[0]] = nameValue[1];
    });

    data.tags = this.addPage.gatherTags();

    ContactRequestManager.addContact(data)
      .then(this.showPage('home'));
  },

  submitUpdatedContact(event) {
    event.preventDefault();

    let id = event.target.dataset.contact_id;
    let data = {id};
    let formData = new FormData(event.target);

    [...formData.entries()].forEach(nameValue => {
      data[nameValue[0]] = nameValue[1];
    });

    data.tags = this.editPage.gatherTags();

    ContactRequestManager.updateContact(data)
      .then(this.showPage('home'));
  },
}
