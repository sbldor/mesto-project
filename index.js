const popups = document.querySelectorAll('.popup');
const forms = Array.from(document.querySelectorAll('.form'))
const buttonOpenEdit = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('#popupedit');
const buttonClosed = Array.from(document.querySelectorAll('.popup__button-closed'));
const buttonAddCards = document.querySelector('.profile__button-add');
const popupCards = document.querySelector('#popupcards');
const formEditElement = popupEdit.querySelector('.form');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('description');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__description');
// TODO функция включения валидации
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass
}) => {
  // * беем все формы
  const formList = Array.from(document.querySelectorAll(formSelector));
  // * функция для проверки валидности всех инпутов в форме
  const isFormValid = (inputList) => inputList
    .every(inputElement => inputElement.validity.valid)
  // * функция взятия нужного errorElement
  const getErrorElement = (inputElement, formElement) => formElement
    .querySelector(`#${inputElement.name + errorClass}`)
  // * функция валидного инпута
  const hideInputErrore = (inputElement, formElement) => {
    const errorElement = getErrorElement(inputElement, formElement);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = ''
  }
  // * функция не валидного инпута
  const showInputErrore = (inputElement, formElement) => {
    const errorElement = getErrorElement(inputElement, formElement);
    inputElement.classList.add(inputErrorClass)
    errorElement.textContent = inputElement.validationMessage;
  }
  // * включаем и выключаем кнопку проверяя валидацию инпутов
  const toggleButtonState = (submitButton, inputList) => {
      if (isFormValid(inputList)) {
        submitButton.disabled = false
      } else {
        submitButton.disabled = true
      }
  }
  // * проверяем валидацию инпутов и вызываем нужную функцию
  const checkInputValidity = (inputElement, formElement) => {
    if (inputElement.validity.valid) {
      hideInputErrore(inputElement, formElement)
    } else {
      showInputErrore(inputElement, formElement)
    }
  }
  // * сбасываем деволтный 'submit' и собираем кастомную валидацию
  const setEventListenes = (formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, formElement);
        toggleButtonState(submitButton, inputList);
      })
      toggleButtonState(submitButton, inputList)
    })
  }
  // * вызываем валидацию для нужной формы
  formList.forEach(formElement => {
    setEventListenes(formElement)
  })
}
// TODO функция отключения валидации после закрытия попапа
function disabledValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass
}) {
  // * беем все формы
  const formList = Array.from(document.querySelectorAll(formSelector));
  // * функция взятия нужного errorElement
  const getErrorElement = (inputElement, formElement) => formElement
    .querySelector(`#${inputElement.name + errorClass}`)
  // * отключаем кнопку
  const defoltButtonState = (submitButton) => {
    submitButton.disabled = true
  }
  // * сьрасываем валидацию инпутов
  const deliteInputValidity = (inputElement, formElement) => {
    const errorElement = getErrorElement(inputElement, formElement);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = ''
  }
  // * собираем вместе отключение валидации
  const deliteValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputList.forEach(inputElement => {
      deliteInputValidity(inputElement, formElement);
      defoltButtonState(submitButton)
    })
    defoltButtonState(submitButton)
  }
  // * отключаем валидацию у нужной формы
  formList.forEach(formElement => {
    deliteValidation(formElement)
  })
}
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__text_error',
  errorClass: '-error'
})

// Функции отткрытия попапов
function addPopup(namePopup) {
  namePopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
};
// Функции закрытия попапов
function closedPopup() {
  popups.forEach(popup => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
    forms.forEach(form=>{
      form.reset()
    })
    disabledValidation({
      formSelector: '.form',
      inputSelector: '.form__text',
      submitButtonSelector: '.form__button',
      inputErrorClass: 'form__text_error',
      errorClass: '-error'
    })
  })
};
// закрытие попапов по клику на крестик
buttonClosed.forEach(button => {
  button.addEventListener('click', closedPopup)
})
// Закрытие попапов по клику на оверлей
popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closedPopup()
    }
  })
})
// функция закрытия попапов по нажатию на esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    closedPopup()
  }
}


// Функция замены текста в профиле
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closedPopup();
};
formEditElement.addEventListener('submit', handleProfileFormSubmit);
// Слушатели попапа редактирования профиля
buttonOpenEdit.addEventListener('click', () => {
addPopup(popupEdit);
nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;
});


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

const popupCardsOpen = document.getElementById('popupcardsopen');
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
// Добавление дефолтных карточек
initialCards.forEach(function addCard(element) {
  cardsContainer.append(createCard(element.link, element.name));
});
// Добавление новой карточки
function handreCardFormSubmit (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(cardLinkInput.value, cardNameInput.value));
  formCardElement.reset()
  closedPopup();
};
formCardElement.addEventListener('submit', handreCardFormSubmit);
// Слушатели пoпапа добавления карточки
buttonAddCards.addEventListener('click', () => addPopup(popupCards));


