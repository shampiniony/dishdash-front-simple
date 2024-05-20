document.addEventListener("DOMContentLoaded", function () {
    const socket = io("https://dishdash.ru", {transports: ["websocket"]});

    // Отправка события joinLobby при подключении
    socket.on('connect', function () {
        socket.emit('joinLobby', JSON.stringify({lobbyID: 1}));
    });

    // Обработчик события получения карточки
    socket.on('card', function (data) {
        const cardData = data["card"];
        displayCard(cardData);
    });

    // Обработчик события получения match
    socket.on('match', function (data) {
        const matchData = data["card"];
        displayMatch(matchData);
    });

    // Функция для заполнения карточки данными
    function fillCardData(cardElement, card) {
        cardElement.querySelector('.place-name').textContent = card.title;
        cardElement.querySelector('.place-image').src = card.image;
        cardElement.querySelector('.place-tag').textContent = card.type;
        cardElement.querySelector('.place-description').textContent = card.shortDescription;
    }

    // Функция отображения карточки
    // Функция отображения карточки
    function displayCard(card) {
        const cardContainer = document.getElementById('cardContainer');
        const template = document.getElementById('placeCardTemplate');
        const clone = document.importNode(template.content, true);

        fillCardData(clone, card);

        const likeButton = clone.querySelector('.like-btn');
        const dislikeButton = clone.querySelector('.dislike-btn');

        likeButton.addEventListener('click', function () {
            sendSwipe('LIKE');
            cardContainer.innerHTML = '';
            clone.querySelector('.place-card').classList.add('swipe-out-right');
        });

        dislikeButton.addEventListener('click', function () {
            sendSwipe('DISLIKE');
            cardContainer.innerHTML = '';
            clone.querySelector('.place-card').classList.add('swipe-out-left');
        });

        cardContainer.innerHTML = '';
        cardContainer.appendChild(clone);
    }


    // Функция отправки события swipe
    function sendSwipe(swipeType) {
        socket.emit('swipe', JSON.stringify({swipeType: swipeType}));
    }

    // Функция отображения match
    function displayMatch(match) {
        const template = document.getElementById('matchTemplate');
        const clone = document.importNode(template.content, true);

        fillCardData(clone, match);

        const closeButton = clone.querySelector('.close-match-btn');
        closeButton.addEventListener('click', function () {
            const modal = document.querySelector('.match-modal');
            if (modal) {
                modal.remove();
            }
        });

        document.body.appendChild(clone);
    }
});
