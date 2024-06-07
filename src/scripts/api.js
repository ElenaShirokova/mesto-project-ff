// базовый конфиг для подключения к серверу
export const baseConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-15/',
    headers: {
        authorization: '53680752-ffe0-4b4e-8a8e-da3b12fcaa3b',
        'Content-Type': 'application/json'
    }
}

// get-запрос на загрузку данных о пользователе
export const getUserInfo = () => {
    return fetch(`${baseConfig.baseUrl}users/me`, {
        headers: baseConfig.headers
    })
}


// // patch-запрос на редактирование данных о пользователе
// export const patchUserInfo = (nameUserNew, aboutUserNew) => {
//     return fetch(`${baseConfig.baseUrl}users/me`, {
//         method: 'PATCH',
//         hesders: baseConfig.headers,
//         body: JSON.stringify({
//             name: nameUserNew,
//             about: aboutUserNew
//         })
//     })
// }

// // patch-запрос на обновление аватара пользователя
// fetch(`${baseConfig.baseUrl}users/me/avatar`, {
//     method: 'PATCH',
//     hesders: baseConfig.headers,
//     body: JSON.stringify({
//         avatar: ''
//     })
// })
//     .then(res => res.json())
//     .then((res) => console.log(res))


// get-запрос на загрузку карточек
export const getInitialCards = () => {
    return fetch(`${baseConfig.baseUrl}cards`, {
        headers: baseConfig.headers
    })
}


// post-запрос на создание карточки
export const postCreateCard = (postName, postLink) => {
    return fetch(`${baseConfig.baseUrl}cards`, {
        method: 'POST',
        headers: baseConfig.headers,
        body: JSON.stringify({
            name: postName,
            link: postLink
        })
    })
}


// // delete-запрос на удаление карточки
// fetch(`${baseConfig.baseUrl}cards/cardID`, {
//     method: 'DELETE',
//     headers: baseConfig.headers
// })
//     .then(res => res.json())
//     .then((res) => console.log(res))


// // put-запрос на лайк карточки
// fetch(`${baseConfig.baseUrl}cards/likes/cardID`, {
//     method: 'PUT',
//     headers: baseConfig.headers
// })
//     .then(res => res.json())
//     .then((res) => console.log(res))


// // delete-запрос на удаление лайкa карточки
// fetch(`${baseConfig.baseUrl}cards/likes/cardID`, {
//     method: 'DELETE',
//     headers: baseConfig.headers
// })
//     .then(res => res.json())
//     .then((res) => console.log(res))


