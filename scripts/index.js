const placesList = document.querySelector('.places__list');
const cardDelete = document.querySelector('.card__delete-button');

function createCard(element, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__title').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;

    const cardDelete = cardElement.querySelector('.card__delete-button');
    cardDelete.addEventListener('click', function () {deleteCard(cardElement)});

    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach((item) => {
    const card = createCard(item, deleteCard);
    placesList.append(card);
})