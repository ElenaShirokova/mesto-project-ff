//базовые настройки селекторов работы форм
export const popupSelectors = {
    popupIsOpenedSelector: 'popup_is-opened',
    popupInputSelector: '.popup__input'
};

// Функция открытия попапа
export function openPopup(popupElement, popupSelectors) {
    popupElement.classList.add(popupSelectors.popupIsOpenedSelector);
    document.addEventListener('keydown', closePopupKeyHandler);
    popupElement.addEventListener('click', closePopupOverlay);
}

// Функция закрытия попапа
export function closePopup(popupElement, popupSelectors) {
  popupElement.classList.remove(popupSelectors.popupIsOpenedSelector);
  document.removeEventListener('keydown', closePopupKeyHandler(popupSelectors));
  popupElement.removeEventListener('click', closePopupOverlay);
}

// Функция закрытия попапа через оверлей
function closePopupOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.target);
    }
}

// Функция закрытия попапа через Esc
function closePopupKeyHandler(evt, popupSelectors) {
    if (evt.key === 'Escape') {
        const popupObjOpen = document.querySelector(popupSelectors.popupIsOpenedSelector);
        closePopup(popupObjOpen);
    }
}

// Функция очистки полей ввода формы
export function clearInput(popupElement, popupSelectors) {
    const textInput = popupElement.querySelectorAll(popupSelectors.popupInputSelector);
    textInput.forEach((item) => {
        item.value = '';
    });
}
