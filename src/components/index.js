import '../pages/index.css';
import { disabledValidation, enableValidation } from './validate';
import { openPopup, closePopup } from './modal';
import { initialCards } from './initial-cards';
import { createCard } from './cards';

const buttonOpenEdit = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('#popup-edit');
const buttonAddCards = document.querySelector('.profile__button-add');
const popupCards = document.querySelector('#popup-cards');
const formEditElement = popupEdit.querySelector('.form');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('description');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');
const cardsContainer = document.querySelector('.cards');
const formCardElement = popupCards.querySelector('.form');
const cardNameInput = document.getElementById('cardname');
const cardLinkInput = document.getElementById('cardlink');
const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__text_error',
  errorClass: '-error'
}
// * Функция замены текста в профиле
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
};
formEditElement.addEventListener('submit', handleProfileFormSubmit);
// * Слушатели попапа редактирования профиля
buttonOpenEdit.addEventListener('click', () => {
  // сброс валидации
  disabledValidation(configValidation, formEditElement)
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});
// * Добавление дефолтных карточек
initialCards.forEach(function addCard(element) {
  cardsContainer.append(createCard(element.link, element.name));
});
// * Добавление новой карточки
function handreCardFormSubmit (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(cardLinkInput.value, cardNameInput.value));
  formCardElement.reset()
  closePopup();
};
formCardElement.addEventListener('submit', handreCardFormSubmit);
// * Слушатели пoпапа добавления карточки
buttonAddCards.addEventListener('click', () => {
  // сброс валидации
  disabledValidation(configValidation, formCardElement)
  formCardElement.reset();
  openPopup(popupCards);
})
// * включение валидации
enableValidation(configValidation)
