const popups = document.querySelectorAll('.popup');
const closeButtons = Array.from(document.querySelectorAll('.popup__button-closed'));
// * Функции отткрытия попапов
export function openPopup(namePopup) {
   namePopup.classList.add('popup_opened');
   document.addEventListener('keydown', closePopupOnEsc);
   
};
// * Функции закрытия попапов
export function closePopup() {
   document.removeEventListener('keydown', closePopupOnEsc);
   popups.forEach(popup => {
      popup.classList.remove('popup_opened');
   })
};
// * функция закрытия попапов по нажатию на esc
function closePopupOnEsc(evt) {
   if (evt.key === 'Escape') {
      closePopup()
   }
}
// * Закрытие попапов по клику на оверлей
popups.forEach(popup => {
   popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
         closePopup()
      }
   })
})
// * закрытие попапов по клику на крестик
closeButtons.forEach(button => {
   button.addEventListener('click', closePopup)
})