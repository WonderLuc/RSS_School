import Component from '../Component';

require('./style.scss');

export default class NewUser implements Component {
  userElement: HTMLElement;

  constructor() {
    this.userElement = document.createElement('div');
  }

  render(): HTMLElement {
    this.userElement.innerHTML = `
    <div class="new-user">
      <h3 class="new-user__text">Register New Player</h3>
      <form class="new-user__form">
        <div class="new-user-wrapper">
          <div class="field first-name">
            <h4 class="field__mark">First Name</h4>
            <fieldset class="user_data">
              <input class="field__input first-name__input" type="text" placeholder="Put your First name">
              <div class="checkbox-wrapper">
                <input class="correct first-name__correct" type="checkbox" disabled>
                <div class="custom-checkbox"></div>
              </div>
            </fieldset>
          </div>
          <div class="field last-name">
            <h4 class="field__mark">Last Name</h4>
            <fieldset class="user_data">
              <input class="field__input last-name__input" type="text" placeholder="Put your Last name">
              <div class="checkbox-wrapper">
                <input class="correct last-name__correct" type="checkbox" disabled>
                <div class="custom-checkbox"></div>
              </div>
            </fieldset>
          </div>
          <div class="field email">
            <h4 class="field__mark">Email</h4>
            <fieldset class="user_data">
              <input class="field__input email__input" type="email" placeholder="Put your email">
              <div class="checkbox-wrapper">
                <input class="correct email__correct" type="checkbox" disabled>
                <div class="custom-checkbox"></div>
              </div>
            </fieldset>
          </div>
        </div>
        <figure class="new-user__image">
          <input class="image-input" type="file" accept="image/*">
        </figure>
      </form>
      <div class="new-user__buttons">
        <button class="new-user__button new-user__button_create">Add User</button>
        <button class="new-user__button new-user__button_cancel">Cancel</button>
      </div>
    </div>
    `;
    return this.userElement;
  }
}
