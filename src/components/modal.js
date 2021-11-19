const forms = Array.from(document.querySelectorAll('.form'));
const popups = document.querySelectorAll('.popup');
const buttonClosed = Array.from(document.querySelectorAll('.popup__button-closed'));
// * Функции отткрытия попапов
export function addPopup(namePopup) {
   namePopup.classList.add('popup_opened');
   document.addEventListener('keydown', closePopupOnEsc);
   
};
// * Функции закрытия попапов
export function closedPopup() {
   popups.forEach(popup => {
      popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', closePopupOnEsc);
      forms.forEach(form => {
         form.reset()
      })
   })
};
// * функция закрытия попапов по нажатию на esc
function closePopupOnEsc(evt) {
   if (evt.key === 'Escape') {
      closedPopup()
   }
}
// * Закрытие попапов по клику на оверлей
popups.forEach(popup => {
   popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
         closedPopup()
      }
   })
})
// * закрытие попапов по клику на крестик
buttonClosed.forEach(button => {
   button.addEventListener('click', closedPopup)
})