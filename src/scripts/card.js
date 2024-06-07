// создает разметку корзины для моих карточек
function createDeleteButton () {
  return '<button type="button" class="card__delete-button"></button>'
}

// вставляет разметку корзины в DOM
function addDeleteButtonToDom(container, markup) {
  container.insertAdjacentHTML('afterbegin', markup)
}

// Функция создания карточки
export function createCard(element, deleteCard, likeCardFunction, openImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardElement.querySelector('.card__title').textContent = element.name;

  cardImage.addEventListener('click', openImage);

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeCardFunction);

  if (element.myCardBool) {
    const cardDeleteButton = cardElement.querySelector('.container__delete-button');
    addDeleteButtonToDom(cardDeleteButton, createDeleteButton());
    const cardDelete = cardElement.querySelector('.card__delete-button');
    cardDelete.addEventListener('click', function () {deleteCard(cardElement)});
  }

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