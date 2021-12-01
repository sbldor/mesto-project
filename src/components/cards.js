import { openPopup } from "./modal";
import { addCardLike, removeCardLike, deliteCard} from "./api";

const popupCardsOpen = document.getElementById('popup-cards-open');

// * Функция обработки информации карточек
const cardsTemplate = document.querySelector('#cards').content;
export function createCard(card, user) {
   const cardsElement = cardsTemplate.querySelector('.cards__card').cloneNode(true);
   const newPhoto = cardsElement.querySelector('.cards__image');
   const newName = cardsElement.querySelector('.cards__name');
   const likeCounter = cardsElement.querySelector('.cards__counter');
   const likeButton = cardsElement.querySelector('.cards__button');
   const deliteButton = cardsElement.querySelector('.cards__button-delite');
   newPhoto.alt = card.name;
   newPhoto.src = card.link;
   newName.textContent = card.name;

   removeButtonsFromUsers(card, user, deliteButton)
   addLikes(card, user, likeCounter, likeButton)

   // Открытие попапа с увеличением фото
   newPhoto.addEventListener('click', () => openPopupCard(popupCardsOpen, card));
   
   // Лайк карточки
   likeButton.addEventListener('click', (evt) => toggleLike(evt, card, likeCounter));
   
   // Удаление карточки
   deliteButton.addEventListener('click', () => sendDeliteCard(card, cardsElement));
   
   return cardsElement;
}

// * отображение лайков 

function addLikes (card, user, counter, like) {
   counter.textContent = card.likes.length;
   if (card.likes.some(el => el._id === user._id)) {
      like.classList.add('cards__button_active')
   }
}

// * Попап открытия увеличения карточки

function openPopupCard (popup, card) {
   popup.querySelector('.popup__image').src = card.link;
   popup.querySelector('.popup__image').alt = card.name;
   popup.querySelector('.popup__image-title').textContent = card.name;
   openPopup(popup);
}

// * функция лайков
function toggleLike (evt, card, counter) {
   const id = card._id
   const target = evt.target
   if (target.classList.contains('cards__button_active')) {
      removeCardLike(id)
         .then(res => {
            target.classList.remove('cards__button_active')
            counter.textContent = res.likes.length
         })
   } else {
      addCardLike(id)
         .then(res => {
            target.classList.add('cards__button_active')
            counter.textContent = res.likes.length
         })
         .catch(err => console.log(err))
   }
}

// * Функция удаления карточки
function sendDeliteCard (card, cardsElement) {
   const id = card._id
   deliteCard(id)
   .then(() => {
      cardsElement.remove()
   })
   .catch(err => console.log(err))
}

// * Функция проверки на овнера
function removeButtonsFromUsers(card, user, deliteButton) {
   if (card.owner._id !== user._id) {
      deliteButton.classList.add('cards__button-delite_enabled')
   }
}
