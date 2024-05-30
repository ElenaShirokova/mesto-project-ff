// Импорт файлов
import './index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCardFunction } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modals.js';

//  Импорт картинок
const imgAddIcon = new URL('./images/add-icon.svg', import.meta.url);
const imgAvatar = new URL('./images/avatar.jpg', import.meta.url);
const imgCard1 = new URL('./images/card_1.jpg', import.meta.url);
const imgCard2 = new URL('./images/card_2.jpg', import.meta.url);
const imgCard3 = new URL('./images/card_3.jpg', import.meta.url);
const imgClose = new URL('./images/close.svg', import.meta.url);
const imgDeleteIcon = new URL('./images/delete-icon.svg', import.meta.url);
const imgEditIcon = new URL('./images/edit-icon.svg', import.meta.url);
const imgLikeActive = new URL('./images/like-active.svg', import.meta.url);
const imgLikeInactive = new URL('./images/like-inactive.svg', import.meta.url);
const imgLogo = new URL('./images/logo.svg', import.meta.url);

const imagesImport = [
    { name: 'Add Icon', link: imgAddIcon },
    { name: 'Avatar', link: imgAvatar },
    { name: 'Card1', link: imgCard1 },
    { name: 'Card2', link: imgCard2 },
    { name: 'Card3', link: imgCard3 },
    { name: 'Close', link: imgClose },
    { name: 'Delete Icon', link: imgDeleteIcon },
    { name: 'Edit Icon', link: imgEditIcon },
    { name: 'Like Active', link: imgLikeActive },
    { name: 'Like Inactive', link: imgLikeInactive },
    { name: 'Logo', link: imgLogo },
];

const placesList = document.querySelector('.places__list');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const content = document.querySelector('.content');
const formElementProfileEdit = document.querySelector('.popup_type_edit');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputJobProfile = document.querySelector('.popup__input_type_description');
const profileEditTitle = document.querySelector('.profile__title');
const profileEditDescription = document.querySelector('.profile__description');
const formElementNewCard = document.querySelector('.popup_type_new-card');

// Вывод карточек
initialCards.forEach((item) => {
    const card = createCard(item, deleteCard, likeCardFunction);
    placesList.prepend(card);
})


function handleFormSubmit(evt) {
    evt.preventDefault();

    const formElementProfileEdit = document.querySelector('.popup_type_edit');

    const inputNameProfileValue = document.forms.editProfile.elements.name.value;
    const inputJobProfileValue = document.forms.editProfile.elements.description.value;

    inputNameProfile.value = profileEditTitle.textContent;
    inputJobProfile.value = profileEditDescription.textContent;

    profileEditTitle.textContent = inputNameProfileValue;
    profileEditDescription.textContent = inputJobProfileValue;

    closePopup(formElementProfileEdit);
}

// Обработка формы создания карточки
function handleFormNewCardSubmit(evt) {
    evt.preventDefault();

    const formElementNewCard = document.querySelector('.popup_type_new-card');
    const formNewCard = document.forms.newPlace;
    const inputPlaceNameNewCardValue = document.forms.newPlace.elements.placeName.value;
    const inputUrlNewCardValue = document.forms.newPlace.elements.link.value;

    const newCardItem = {
        name: inputPlaceNameNewCardValue,
        link: inputUrlNewCardValue
    };
    const newCard = createCard(newCardItem, deleteCard, likeCardFunction);
    placesList.prepend(newCard);

    closePopup(formElementNewCard);
    formNewCard.reset();
}

// Открытие форм
content.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__edit-button')) {
        inputNameProfile.value = profileEditTitle.textContent;
        inputJobProfile.value = profileEditDescription.textContent;
        openPopup(popupProfileEdit);
    } else if (evt.target.classList.contains('profile__add-button')) {
        openPopup(popupNewCard);
    } else if (evt.target.classList.contains('card__image')) {
        const popupImageOpenImg = popupImage.querySelector('.popup__image');
        const popupImageText = popupImage.querySelector('.popup__caption');

        popupImageOpenImg.src = evt.target.src;
        popupImageOpenImg.alt = evt.target.alt;
        popupImageText.textContent = evt.target.alt;

        openPopup(popupImage);
    }
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
formElementProfileEdit.addEventListener('submit', handleFormSubmit);
formElementNewCard.addEventListener('submit', handleFormNewCardSubmit, initialCards);

