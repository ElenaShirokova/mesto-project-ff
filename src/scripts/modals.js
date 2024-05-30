// Функция открытия попапа
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandler);
    popupElement.addEventListener('click', closePopupOverlay);
}

// Функция закрытия попапа
export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    popupElement.removeEventListener('keydown', keyHandler);
    popupElement.removeEventListener('click', closePopupOverlay);
}

// Функция закрытия попапа через оверлей
function closePopupOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        const popupObjOpen = document.querySelector('.popup_is-opened');
        closePopup(popupObjOpen);
    }
}

// Функция закрытия попапа через Esc
function keyHandler(evt) {
    if (evt.key === 'Escape') {
        const popupObjOpen = document.querySelector('.popup_is-opened');
        closePopup(popupObjOpen);
    }
}