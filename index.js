
const popapOpen = document.querySelector('.profile__button-edit');
const popup = document.querySelector('#popuplogin');
const popupClosed = popuplogin.querySelector('.popup__button-closed');
// Открытие и закрытия попапа
function addPopup() {
 popuplogin.classList.add('popup_opened');
 nameInput.value = nameProfile.textContent;
 jobInput.value = jobProfile.textContent;
};
popapOpen.addEventListener('click', addPopup);

function closedPopup() {
 popuplogin.classList.remove('popup_opened');
};
popupClosed.addEventListener('click', closedPopup);

const formElement = popuplogin.querySelector('.form');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('description');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');
// Функция замены текста в профиле
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = `${nameInput.value}`;
  jobProfile.textContent = `${jobInput.value}`;
  };
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closedPopup);
// Массив начальных карточек
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

const cardsContainer = document.querySelector('.cards');
// Добавление начальных карточек
initialCards.forEach(function addCard(element) {
  const cardsTemplate = document.querySelector('#cards').content;
  const cardsElement = cardsTemplate.querySelector('.cards__card').cloneNode(true);
  cardsElement.querySelector('.cards__image').src = element.link;
  cardsElement.querySelector('.cards__name').textContent = element.name;
  cardsContainer.append(cardsElement);
});

const addCards = document.querySelector('.profile__button-add');
const popupCards = document.querySelector('#popupcards');
const popupCardClosed = popupcards.querySelector('.popup__button-closed');
// Открытие и закрытие попапа добавления карточки
function addCardPopup() {
 popupcards.classList.add('popup_opened');
 cardLinkInput.value = '';
 cardnameInput.value = '';
};
addCards.addEventListener('click', addCardPopup);

function closedCardPopup() {
 popupcards.classList.remove('popup_opened');
};
popupCardClosed.addEventListener('click', closedCardPopup);

const formCardElement = popupcards.querySelector('.form');
const cardnameInput = document.getElementById('cardname');
const cardLinkInput = document.getElementById('cardlink');
// Добавление новой карточки
function formCardSubmitHandler (evt) {
  evt.preventDefault();
  const cardsTemplate = document.querySelector('#cards').content;
  const cardsElement = cardsTemplate.querySelector('.cards__card').cloneNode(true);
  cardsElement.querySelector('.cards__image').src = cardLinkInput.value
  cardsElement.querySelector('.cards__name').textContent = cardnameInput.value;
  cardsContainer.prepend(cardsElement);
  deliteCard();
  likeCard();
  popupCard();
};
formCardElement.addEventListener('submit', formCardSubmitHandler);
formCardElement.addEventListener('submit', closedCardPopup);
// Удаления карточки
function deliteCard() {
  for (let deliteButton of document.querySelectorAll('.cards__button-delite')) {
    deliteButton.addEventListener('click', function () {
      const del = deliteButton.closest('.cards__card');
      del.remove();
    });
  };
};
deliteCard();
// Лайк карточки
function likeCard() {
  for (let buttonLike of document.querySelectorAll('.cards__button')) {
    buttonLike.addEventListener('click', (likeEvt));
  };
};
function likeEvt(evt) {
  evt.target.classList.toggle('cards__button_active');
};
likeCard();
// Попап с зумом карточи
const popupOpenImage = document.querySelector('#popupcardsopen');
const popupOpenImageClosed = popupOpenImage.querySelector('.popup__button-closed');
function popupCard() {
  for (let image of document.querySelectorAll('.cards__image')) {
    image.addEventListener('click', function (evt) {
      popupOpenImage.classList.add('popup_opened');
      let name = evt.target.closest('.cards__card').querySelector('.cards__name');
      popupOpenImage.querySelector('.popup__image').src = image.src;
      popupOpenImage.querySelector('.popup__image-title').textContent = name.textContent;
    });
  };
};
popupCard();

function closedPopupImage() {
 popupOpenImage.classList.remove('popup_opened');
};
popupOpenImageClosed.addEventListener('click', closedPopupImage);


