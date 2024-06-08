//базовые настройки валидации
const objectsValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__input-error',
    errorClass: 'popup__error_visible'
  };

//показывает элемент ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(objectsValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objectsValidation.errorClass);
  };

  //скрывает элемент ошибки
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(objectsValidation.inputErrorClass);
    errorElement.classList.remove(objectsValidation.errorClass);
    errorElement.textContent = '';
};

//контролирует валидность заполнения поля формы
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//делает заключение о валидности формы (ввалидны все поля)
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

//переключчает активность кнопки отправки
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
        buttonElement.disabled = true;
        buttonElement.classList.add(objectsValidation.inactiveButtonClass);
    } else {
          // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove(objectsValidation.inactiveButtonClass);
    }
  };

//вешает слушатель на все поля ввода внутри формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(objectsValidation.inputSelector));
  const buttonElement = formElement.querySelector(objectsValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
          isValid(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
      });
  });
};

//добавляет обработчики всем формам
export const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(objectsValidation.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        // formElement.addEventListener('submit', (evt) => {
        //   evt.preventDefault();
        // });
        setEventListeners(formElement);
      });
  };
