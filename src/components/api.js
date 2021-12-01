// * Конфиг для fetch

const configFetch = {
   baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-4',
   headers: {
      authorization: '6964e665-5711-4931-96f3-452c660b2bf9',
      'Content-Type': 'application/json'
   }
}

// * Проверка

const resCheck = (res) => {
   if (res.ok) {
      return res.json();
   } else {
      return Promise.reject(`Что-то пошло не так( Ошибка: ${res.status}`)
   }
}

// * Загрузка информации о пользователе с сервера

export function getProfileData () {
   return fetch(`${configFetch.baseUrl}/users/me`, {
      headers: configFetch.headers
   })
   .then(resCheck)
}

// * Загрузка карточек с сервера

export function getCardData () {
   return fetch(`${configFetch.baseUrl}/cards`, {
      headers: configFetch.headers
   })
   .then(resCheck)
}

// * Редактирование профиля

export function sendProfileData (data) {
   return fetch(`${configFetch.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: configFetch.headers,
      body: JSON.stringify({
         name: data.name,
         about: data.about
      })
   })
   .then(resCheck)
}

// * Добавление новой карточки

export function addNewCard (data) {
   return fetch(`${configFetch.baseUrl}/cards`, {
      method: 'POST',
      headers: configFetch.headers,
      body: JSON.stringify({
         name: data.name,
         link: data.link
      })
   })
   .then(resCheck)
}

// * Лайк карточки

export function addCardLike (id) {
   return fetch(`${configFetch.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: configFetch.headers
   })
   .then(resCheck)
}

// * Удаление карточки

export function removeCardLike(id) {
   return fetch(`${configFetch.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: configFetch.headers
   })
   .then(resCheck)
}

// * Удаление карточки 

export function deliteCard(id) {
   return fetch(`${configFetch.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: configFetch.headers,
   })
   .then(resCheck)
}

// * Обновление аватара пользователя

export function UpdatingUserAvatar(url) {
   return fetch(`${configFetch.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: configFetch.headers,
      body: JSON.stringify({
         avatar: url
      })
   })
   .then(resCheck)
}