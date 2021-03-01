class App {
  constructor() {
    Templates.createTemplates();
    Object.assign(App.prototype, EventCallbacksMixin);

    this.homePage = new HomePage();
    this.addPage = new AddContactPage();
    this.editPage = new EditContactPage();

    this.attachListeners();
  }

  attachListeners() {
    this.attachHomePageListeners();
    this.attachEditPageListeners();
    this.attachAddPageListeners();
  }

	attachHomePageListeners() {
		this.homePage.container.addEventListener('click', event => {
			if (event.target.id === 'addContact') {
        this.loadAddPage();
			} else if (event.target.classList.contains('edit')) {
        this.loadEditPage(event);  
      } else if (event.target.classList.contains('delete')) {
        this.deleteContact(event);
      } else if (event.target.classList.contains('tag')) {
        this.filterByTag(event);
      } else if (event.target.id === 'showAll') {
        this.showAllContacts();
      }
		});

    this.attachSearchListener();
	}

  attachAddPageListeners() {
    this.addPage.container.addEventListener('click', event => {
      if (event.target.id === 'cancel') {
        this.cancelForm(event);
      } else if (event.target.id === 'addTag') {
        this.createNewTag(this.addPage, event); 
      } else if (event.target.classList.contains('tag')) {
        this.removeTag(event);
      }
    });

    this.addPage.container.addEventListener('submit', event => {
      this.submitNewContact(event);
    });
  }

  attachEditPageListeners() {
    this.editPage.container.addEventListener('click', event => {
      if (event.target.id === 'cancel') {
        this.cancelForm(event);
      } else if (event.target.id === 'addTag') {
        this.createNewTag(this.editPage, event); 
      } else if (event.target.classList.contains('tag')) {
        this.removeTag(event);
      }
    });

    this.editPage.container.addEventListener('submit', event => {
      this.submitUpdatedContact(event);
    });
  }

  attachSearchListener() {
    this.homePage.searchBar.addEventListener('input', event => {
      let searchText = event.target.value;

      this.homePage.contactsList.forEach(contact => {
        if (!searchText || UtilityMethods.searchMatch(contact, searchText)) {
          contact.show();
        } else {
          contact.hide();
        }
      });
    });
  }

  showPage(page, id) {
    switch(page) {
      case 'home':
        this.addPage.hide();
        this.editPage.hide();
        this.homePage.show();
        break;
      case 'add':
        this.homePage.hide();
        this.addPage.show();
        break;
      case 'edit':
        this.homePage.hide();
        this.editPage.show(id);
        break;
    }
	}
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
