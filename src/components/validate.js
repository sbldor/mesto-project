export const enableValidation = ({
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
export function disabledValidation({
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