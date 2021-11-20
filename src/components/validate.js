// TODO включение валидации
// * функция для проверки валидности всех инпутов в форме
const isFormValid = (inputList) => inputList
   .every(inputElement => inputElement.validity.valid)
// * функция взятия нужного errorElement
const getErrorElement = (inputElement, formElement, config) => formElement
   .querySelector(`#${inputElement.name + config.errorClass}`)
// * функция валидного инпута
const hideInputErrore = (inputElement, formElement, config) => {
   const errorElement = getErrorElement(inputElement, formElement, config);
   inputElement.classList.remove(config.inputErrorClass);
   errorElement.textContent = ''
}
// * функция не валидного инпута
const showInputErrore = (inputElement, formElement, config) => {
   const errorElement = getErrorElement(inputElement, formElement, config);
   inputElement.classList.add(config.inputErrorClass)
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
const checkInputValidity = (inputElement, formElement, config) => {
   if (inputElement.validity.valid) {
      hideInputErrore(inputElement, formElement, config)
   } else {
      showInputErrore(inputElement, formElement, config)
   }
}
// * сбасываем деволтный 'submit' и собираем кастомную валидацию
const setEventListenes = (formElement, config) => {
   formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
   })
   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
   const submitButton = formElement.querySelector(config.submitButtonSelector);
   inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
         checkInputValidity(inputElement, formElement, config);
         toggleButtonState(submitButton, inputList, config);
      })
      toggleButtonState(submitButton, inputList, config)
   })
}
export const enableValidation = (config) => {
   // * вызываем валидацию для нужной формы
   const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach(formElement => {
      setEventListenes(formElement, config)
   })
}
// TODO отключение валидации после закрытия попапа
// * собираем вместе отключение валидации
const resetValidation = (formElement, config) => {
   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
   const submitButton = formElement.querySelector(config.submitButtonSelector);
   inputList.forEach(inputElement => {
      hideInputErrore(inputElement, formElement, config)
      toggleButtonState(submitButton, inputList, config);
   })
   toggleButtonState(submitButton, inputList, config)
}
export function disabledValidation(config, formElement) {
   // * отключаем валидацию у нужной формы
      resetValidation(formElement, config)
}