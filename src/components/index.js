import '../pages/index.css';
import { disabledValidation, enableValidation } from './validate';
import { openPopup, closePopup } from './modal';
import { createCard } from './cards';
import { getProfileData, getCardData, sendProfileData, addNewCard, UpdatingUserAvatar } from './api';
// профиль
const popupEdit = document.querySelector('#popup-edit');
const formEditElement = popupEdit.querySelector('.form');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('description');
const buttonOpenEdit = document.querySelector('.profile__button-edit');
const submitButtonEdit = formEditElement.querySelector('.form__button');
// карты
const popupCards = document.querySelector('#popup-cards');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');
const cardsContainer = document.querySelector('.cards');
const formCardElement = popupCards.querySelector('.form');
const cardNameInput = document.getElementById('cardname');
const cardLinkInput = document.getElementById('cardlink');
const buttonAddCards = document.querySelector('.profile__button-add');
const submitButtonAdd = formCardElement.querySelector('.form__button');
// аватар
const avatar = document.querySelector('.profile__avatar');
const buttonAvatar = document.querySelector('.profile__avatar-container');
const popupAvatar = document.querySelector('#popup-avatar');
const formAvararElement = popupAvatar.querySelector('.form');
const avatarLinkInput = document.getElementById('avatar');
const submitButtonAvatar = formAvararElement.querySelector('.form__button')

const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__text_error',
  errorClass: '-error'
}

let user;
Promise.all([getCardData(), getProfileData()])
  .then(([cards, userData]) => {
    cards.forEach(card => {
      addCardData(createCard(card, userData));
    })
    addProfileData(userData.name, userData.about);
    addAvatarData(userData.avatar)
    user = userData
  })
  .catch(err => {
    console.log(err)
  })

// * информация профиля 
function addProfileData (name, about) {
  nameProfile.textContent = name;
  jobProfile.textContent = about;
}

// * информация аватара 
function addAvatarData(avatarData) {
  avatar.src = avatarData
}

// * Функция замены текста в профиле
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  submitButtonEdit.textContent = 'Сохранение...'
  const data = {
    name: nameInput.value,
    about: jobInput.value
  }
  
  sendProfileData(data)
    .then(res => {
      addProfileData(res.name, res.about)
      closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => submitButtonEdit.textContent = 'Сохранить')
  
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

// * Функция добавление новой карточки
function handreCardFormSubmit (evt) {
  evt.preventDefault();
  submitButtonAdd.textContent = 'Создание...'
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  addNewCard(data)
    .then(card => {
      addCardData(createCard(card, user));
      formCardElement.reset();
      closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => submitButtonEdit.textContent = 'Создать')
};
formCardElement.addEventListener('submit', handreCardFormSubmit);

// * Слушатели пoпапа добавления карточки
buttonAddCards.addEventListener('click', () => {
  // сброс валидации
  disabledValidation(configValidation, formCardElement)
  formCardElement.reset();
  openPopup(popupCards);
})

// * Функция вставки карточки
function addCardData (cards) {
  cardsContainer.append(cards)
}

// * Функция замены аватара
function handreavatarFormSubmit(evt) {
  evt.preventDefault();
  submitButtonAvatar.textContent = 'Сохранение...'
  const url = avatarLinkInput.value
  UpdatingUserAvatar(url)
    .then(res => {
      avatar.src = res.avatar;
      formAvararElement.reset();
      closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => submitButtonEdit.textContent = 'Сохранить')
}
formAvararElement.addEventListener('submit', handreavatarFormSubmit)

// * слушатель открытия попапа аватара
buttonAvatar.addEventListener('click', () => {
  disabledValidation(configValidation, formAvararElement)
  formAvararElement.reset();
  openPopup(popupAvatar);
})
// * включение валидации
enableValidation(configValidation)
