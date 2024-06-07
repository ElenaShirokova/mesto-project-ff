
export const objectsValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: '.popup__button_disabled',
    inputErrorClass: '.popup__input_type_error',
    errorClass: '.popup__error_visible'
  };

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(objectsValidation.inputErrorClass);
    console.log(errorElement);
    console.log(formElement.querySelector(`.${inputElement.id}-error`));
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objectsValidation.errorClass);
  };

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(objectsValidation.inputErrorClass);
    errorElement.classList.remove(objectsValidation.errorClass);
    errorElement.textContent = '';
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(objectsValidation.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
    });
    });
    const buttonElement = formElement.querySelector(objectsValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);

            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
});
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
})
};

// const hasInvalidInput = (inputList) => {
//     const val = inputList.some((inputElement) => {
//       console.log(`${inputElement.name} : ${inputElement.validity.valid}`);
//       return !inputElement.validity.valid;
//     });
//     console.log(`hasInvalidInput : ${val}`);
//     return val;
//   };


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

  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      if(inputElement.validity.patternMismatch){
        inputElement.setCustomValidity(inputElement.dataset.errorMessagePatternMissmatch);
      }
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };


export const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(objectsValidation.formSelector));


    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        setEventListeners(formElement);
      });
  };

  // Вызовем функцию
//   enableValidation();