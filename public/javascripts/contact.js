class Contact {
  constructor(element) {
    this.container = element;
    this.fullName = element.querySelector('.fullName').innerText;
    this.phoneNumber = element.querySelector('.phoneNumber').innerText;
    this.email = element.querySelector('.email').innerText;
    this.id = element.dataset.id;
    this.tagContainer = this.container.querySelector('.tagContainer');
  }

  hasTag(tagName) {
    return [...this.tagContainer.children].some(tag => {
      return tag.innerText === tagName;
    });
  }

  hide() {
    this.container.classList.add('hidden');
  }

  show() {
    this.container.classList.remove('hidden');
  }
}
