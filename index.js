
const buttonOpenEdit = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('#popupedit');
const buttonEditClosed = popupEdit.querySelector('.popup__button-closed');
const buttonAddCards = document.querySelector('.profile__button-add');
const popupCards = document.querySelector('#popupcards');
const buttonCardClosed = popupCards.querySelector('.popup__button-closed');
const formEditElement = popupEdit.querySelector('.form');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('description');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');
// Функции отткрытия попапов
function addPopup(namePopup) {
 namePopup.classList.add('popup_opened');
};
// Функции закрытия попапов
function closedPopup(namePopup) {
 namePopup.classList.remove('popup_opened');
};
// Функция замены текста в профиле
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closedPopup(popupEdit);
  };
formEditElement.addEventListener('submit', handleProfileFormSubmit);
// Функция открытия попапа профиля с значениями из профиля
function addEditPopup() {
 popupEdit.classList.add('popup_opened');
 nameInput.value = nameProfile.textContent;
 jobInput.value = jobProfile.textContent;
};
buttonOpenEdit.addEventListener('click', addEditPopup);
// Слушател,закрытия попапа профиля
buttonEditClosed.addEventListener('click', () => closedPopup(popupEdit));
// Массив дефолтных карточек
const initialCards = [
{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

const popupCardsOpen = document.getElementById('popupcardsopen')
const cardsContainer = document.querySelector('.cards');
const formCardElement = popupCards.querySelector('.form');
const cardNameInput = document.getElementById('cardname');
const cardLinkInput = document.getElementById('cardlink');
const cardsTemplate = document.querySelector('#cards').content;
// Функция обработки информации карточек
function createCard(cardPhotoLink, cardName) {
  const cardsElement = cardsTemplate.querySelector('.cards__card').cloneNode(true);
  const newPhoto = cardsElement.querySelector('.cards__image');
  const newName = cardsElement.querySelector('.cards__name');
  newPhoto.alt = cardName;
  newPhoto.src = cardPhotoLink;
  newName.textContent = cardName;
// Открытие попапа с увеличением фото
  newPhoto.addEventListener('click', () => {
    const buttonClocedPopupFullPhoto = popupCardsOpen.querySelector('.popup__button-closed');
    popupCardsOpen.querySelector('.popup__image').src = cardPhotoLink;
    popupCardsOpen.querySelector('.popup__image').alt = cardName;
    popupCardsOpen.querySelector('.popup__image-title').textContent = cardName;
    addPopup(popupCardsOpen);
    buttonClocedPopupFullPhoto.addEventListener('click', () => closedPopup(popupCardsOpen));
  });
// Лайк карточки
  cardsElement.querySelector('.cards__button').addEventListener('click', (evet) => {
    evet.target.classList.toggle('cards__button_active');
  });
// Удаление карточки
  cardsElement.querySelector('.cards__button-delite').addEventListener('click', () => {
    cardsElement.remove();
  });
// return
  return cardsElement;
}
// Добавление дефолтных карточек
initialCards.forEach(function addCard(element) {
  cardsContainer.append(createCard(element.link, element.name));
});
// Добавление новой карточки
function handreCardFormSubmit (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(cardLinkInput.value, cardNameInput.value));
  cardLinkInput.value = '';
  cardNameInput.value = '';
  closedPopup(popupCards);
};
formCardElement.addEventListener('submit', handreCardFormSubmit);
// Слушатели пoпапа добавления карточки
buttonAddCards.addEventListener('click', () => addPopup(popupCards));
buttonCardClosed.addEventListener('click', () => closedPopup(popupCards));
