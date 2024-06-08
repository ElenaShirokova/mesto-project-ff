// Импорт файлов
import './index.css';
import { createCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modals.js';
import { getInitialCards, postCreateCard, getUserInfo, patchUserInfo, patchUserImage } from './scripts/api.js';
// import { objectsValidation, enableValidation } from './scripts/validation.js';

// Переменные
const placesList = document.querySelector('.places__list');
const popupProfileEditImage = document.querySelector('.popup_type_edit-image');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputJobProfile = document.querySelector('.popup__input_type_description');
const inputUrlNewUserImage = document.querySelector('.popup__input_type_image_url');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formNewCard = document.forms.newPlace;
const inputPlaceNameNewCard = document.querySelector('.popup__input_type_card-name');
const inputUrlNewCard = document.querySelector('.popup__input_type_url');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupImageOpenImg = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__caption');
const buttonProfileEditImage = document.querySelector('.profile__image');


// глобальная переменная для хранения id пользователя
let myUserId

// Вывод данных профиля
function initialUser () {
    getUserInfo()
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;
            profileImage.style.backgroundImage = `url('${res.avatar}')`;
            myUserId = res._id;
        })
        .catch((err) => {
            console.log(err);
        });
}

initialUser();

// Обработка формы редактирования профиля
function handleFormProfileEditSubmit(evt) {
    evt.preventDefault();
    patchUserInfo(inputNameProfile.value, inputJobProfile.value)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;
        })
        .catch((err) => {
            console.log(err);
        });

    closePopup(popupProfileEdit);
}

// Обработка формы обновления аватара пользователя
function handleFormProfileImageEditSubmit(evt) {
    evt.preventDefault();
    patchUserImage(inputUrlNewUserImage.value)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            profileImage.style.backgroundImage = `url('${res.avatar}')`;
        })
        .catch((err) => {
            console.log(err);
        });
        closePopup(popupProfileEditImage);
}


// Вывод карточек
function initialCards() {
    getInitialCards()
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            res.forEach((item) => {
                let myCard
                if (item.owner._id === myUserId) {
                    myCard = true;
                } else {
                    myCard = false;
                }
                const cardObj = {
                    name: item.name,
                    link: item.link,
                    myCardBool: myCard,
                    myCardId: item._id,
                    likes: item.likes.length
                };
                const card = createCard(cardObj, openImage);
                placesList.append(card);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

initialCards();

// Обработка формы создания карточки
function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    const nameNewCard = inputPlaceNameNewCard.value;
    const linkNewCard = inputUrlNewCard.value;
    postCreateCard(nameNewCard, linkNewCard)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            const cardObj = {
                name: res.name,
                link: res.link,
                myCardBool: true,
                myCardId: res._id,
                likes: 0
            };
            const card = createCard(cardObj, openImage);
            placesList.prepend(card);
        })
        .catch((err) => {
            console.log(err);
        });
    closePopup(popupNewCard);
    formNewCard.reset();
}


// Открытие картинки
const openImage = (evt) => {
    popupImageOpenImg.src = evt.target.src;
    popupImageOpenImg.alt = evt.target.alt;
    popupImageText.textContent = evt.target.alt;

    openPopup(popupImage);
}


// Открытие форм
buttonProfileEditImage.addEventListener('click', function () {
    openPopup(popupProfileEditImage);
})

buttonProfileEdit.addEventListener('click', function () {
    inputNameProfile.value = profileTitle.textContent;
    inputJobProfile.value = profileDescription.textContent;
    openPopup(popupProfileEdit);
})

buttonAddNewCard.addEventListener('click', function () {
    openPopup(popupNewCard);
})

// Закрытие форм
popupProfileEditImage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(popupProfileEditImage);
    }
})

popupProfileEdit.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(popupProfileEdit);
    }
})

popupNewCard.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(popupNewCard);
    }
})

popupImage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(popupImage);
    }
})

// Слушатели отправки форм
popupProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);
popupProfileEditImage.addEventListener('submit', handleFormProfileImageEditSubmit);
popupNewCard.addEventListener('submit', handleFormNewCardSubmit);











//  const objectsValidation = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: '.popup__button_disabled',
//     inputErrorClass: '.popup__input_type_error',
//     errorClass: '.popup__error_visible'
//   };

// const showInputError = (formElement, inputElement, errorMessage) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(objectsValidation.inputErrorClass);
//     console.log(errorElement);
//     console.log(formElement.querySelector(`.${inputElement.id}-error`));
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(objectsValidation.errorClass);
//   };

// const hideInputError = (formElement, inputElement) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(objectsValidation.inputErrorClass);
//     errorElement.classList.remove(objectsValidation.errorClass);
//     errorElement.textContent = '';
// };

// const setEventListeners = (formElement) => {
//     const inputList = Array.from(formElement.querySelectorAll(objectsValidation.inputSelector));
//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement);
//     });
//     });
//     const buttonElement = formElement.querySelector(objectsValidation.submitButtonSelector);
//     toggleButtonState(inputList, buttonElement);

//     inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement);

//             // Вызовем toggleButtonState и передадим ей массив полей и кнопку
//       toggleButtonState(inputList, buttonElement);
//     });
// });
// };

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
// })
// };

// // const hasInvalidInput = (inputList) => {
// //     const val = inputList.some((inputElement) => {
// //       console.log(`${inputElement.name} : ${inputElement.validity.valid}`);
// //       return !inputElement.validity.valid;
// //     });
// //     console.log(`hasInvalidInput : ${val}`);
// //     return val;
// //   };


// const toggleButtonState = (inputList, buttonElement) => {
//     // Если есть хотя бы один невалидный инпут
//     if (hasInvalidInput(inputList)) {
//       // сделай кнопку неактивной
//         buttonElement.disabled = true;
//         buttonElement.classList.add(objectsValidation.inactiveButtonClass);
//     } else {
//           // иначе сделай кнопку активной
//         buttonElement.disabled = false;
//         buttonElement.classList.remove(objectsValidation.inactiveButtonClass);
//     }
//   };

//   const checkInputValidity = (formElement, inputElement) => {
//     if (!inputElement.validity.valid) {
//       if(inputElement.validity.patternMismatch){
//         inputElement.setCustomValidity(inputElement.dataset.errorMessagePatternMissmatch);
//       }
//       showInputError(formElement, inputElement, inputElement.validationMessage);
//     } else {
//       hideInputError(formElement, inputElement);
//     }
//   };


//  const enableValidation = () => {
//     // Найдём все формы с указанным классом в DOM,
//     // сделаем из них массив методом Array.from
//     const formList = Array.from(document.querySelectorAll(objectsValidation.formSelector));


//     // Переберём полученную коллекцию
//     formList.forEach((formElement) => {
//         formElement.addEventListener('submit', (evt) => {
//           evt.preventDefault();
//         });
//         setEventListeners(formElement);
//       });
//   };

enableValidation();