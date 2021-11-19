import { addPopup } from "./modal"
const popupCardsOpen = document.getElementById('popupcardsopen');
// * Функция обработки информации карточек
const cardsTemplate = document.querySelector('#cards').content;
export function createCard(cardPhotoLink, cardName) {
   const cardsElement = cardsTemplate.querySelector('.cards__card').cloneNode(true);
   const newPhoto = cardsElement.querySelector('.cards__image');
   const newName = cardsElement.querySelector('.cards__name');
   newPhoto.alt = cardName;
   newPhoto.src = cardPhotoLink;
   newName.textContent = cardName;
   // Открытие попапа с увеличением фото
   newPhoto.addEventListener('click', () => {
      popupCardsOpen.querySelector('.popup__image').src = cardPhotoLink;
      popupCardsOpen.querySelector('.popup__image').alt = cardName;
      popupCardsOpen.querySelector('.popup__image-title').textContent = cardName;
      addPopup(popupCardsOpen);
   });
   // Лайк карточки
   cardsElement.querySelector('.cards__button').addEventListener('click', (evet) => {
      evet.target.classList.toggle('cards__button_active');
   });
   // Удаление карточки
   cardsElement.querySelector('.cards__button-delite').addEventListener('click', () => {
      cardsElement.remove();
   });
   return cardsElement;
}

