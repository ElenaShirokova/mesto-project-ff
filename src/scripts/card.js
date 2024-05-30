// Функция создания карточки
export function createCard(element, deleteCard, likeCardFunction, openImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardElement.querySelector('.card__title').textContent = element.name;

  cardElement.addEventListener('click', openImage);

  const cardDelete = cardElement.querySelector('.card__delete-button');
  cardDelete.addEventListener('click', function () {deleteCard(cardElement)});

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeCardFunction);

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// Функция лайка карточки
export function likeCardFunction(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}