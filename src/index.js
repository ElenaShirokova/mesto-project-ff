// Импорт файлов
import './index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCardFunction } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modals.js';

// Переменные
const placesList = document.querySelector('.places__list');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputJobProfile = document.querySelector('.popup__input_type_description');
const profileEditTitle = document.querySelector('.profile__title');
const profileEditDescription = document.querySelector('.profile__description');
const formNewCard = document.forms.newPlace;
const inputPlaceNameNewCard = document.querySelector('.popup__input_type_card-name');
const inputUrlNewCard = document.querySelector('.popup__input_type_url');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupImageOpenImg = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__caption');

// Открытие картинки
const openImage = (evt) => {
    if (evt.target.classList.contains('card__image')) {
        popupImageOpenImg.src = evt.target.src;
        popupImageOpenImg.alt = evt.target.alt;
        popupImageText.textContent = evt.target.alt;

        openPopup(popupImage);
    }
}

// Вывод карточек
initialCards.forEach((item) => {
    const card = createCard(item, deleteCard, likeCardFunction, openImage);
    placesList.prepend(card);
})

// Обработка формы редактирования профиля
function handleFormProfileEditSubmit(evt) {
    evt.preventDefault();

    profileEditTitle.textContent = inputNameProfile.value;
    profileEditDescription.textContent = inputJobProfile.value;

    closePopup(popupProfileEdit);
}

// Обработка формы создания карточки
function handleFormNewCardSubmit(evt) {
    evt.preventDefault();

    const newCardItem = {
        name: inputPlaceNameNewCard.value,
        link: inputUrlNewCard.value
    };

    const newCard = createCard(newCardItem, deleteCard, likeCardFunction);
    placesList.prepend(newCard);

    closePopup(popupNewCard);
    formNewCard.reset();
}

// Открытие форм
buttonProfileEdit.addEventListener('click', function () {
    inputNameProfile.value = profileEditTitle.textContent;
    inputJobProfile.value = profileEditDescription.textContent;
    openPopup(popupProfileEdit);
})

buttonAddNewCard.addEventListener('click', function () {
    openPopup(popupNewCard);
})

// Закрытие форм
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
popupNewCard.addEventListener('submit', handleFormNewCardSubmit);