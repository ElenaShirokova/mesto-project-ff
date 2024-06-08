// Импорт файлов
import './index.css';
import { createCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modals.js';
import { getInitialCards, postCreateCard, getUserInfo, patchUserInfo, patchUserImage } from './scripts/api.js';
import { enableValidation } from './scripts/validation.js';

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

// Обработка формы редактирования профиля
function handleFormProfileEditSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, evt.target.querySelector('.popup__button'));
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
            console.log(err)
        });
        renderLoading(false, evt.target.querySelector('.popup__button'));
        closePopup(popupProfileEdit);
}

// Обработка формы обновления аватара пользователя
function handleFormProfileImageEditSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, evt.target.querySelector('.popup__button'));
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
    renderLoading(false, evt.target.querySelector('.popup__button'));
    closePopup(popupProfileEditImage);
}

// Функция поиска моего лайка в массиве лайков
function searchLike (arr) {
    const like = arr.find((element) => {return element._id === myUserId})
    if (like) {
        return true;
    } else {
        return false;
    }
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
                    likes: item.likes.length,
                    myLike: searchLike(item.likes)
                };
                const card = createCard(cardObj, openImage);
                placesList.append(card);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

// Обработка формы создания карточки
function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, evt.target.querySelector('.popup__button'));
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
                likes: 0,
                myLike: false
            };
            const card = createCard(cardObj, openImage);
            placesList.prepend(card);
        })
        .catch((err) => {
            console.log(err);
        });
    renderLoading(false, evt.target.querySelector('.popup__button'));
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

// Функция визуализации загрузки
function renderLoading(isLoading, buttonElement) {
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...'
    } else {
        buttonElement.textContent = 'Сохранить'
    }
}


initialUser();
initialCards();
enableValidation();

// Слушатели отправки форм
popupProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);
popupProfileEditImage.addEventListener('submit', handleFormProfileImageEditSubmit);
popupNewCard.addEventListener('submit', handleFormNewCardSubmit);
