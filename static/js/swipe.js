document.addEventListener("DOMContentLoaded", function () {
    const apiHost = "https://dishdash.ru"

    const socket = io(apiHost, {transports: ["websocket"]});
    const lobbyID = parseInt(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))

    // Отправка события joinLobby при подключении
    socket.on('connect', function () {
        socket.emit('joinLobby', JSON.stringify({lobbyID: lobbyID}));
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
        });

        dislikeButton.addEventListener('click', function () {
            sendSwipe('DISLIKE');
            cardContainer.innerHTML = '';
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

    const copyLinkBtn = document.getElementById("copyLinkBtn");
    copyLinkBtn.addEventListener("click", function () {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(function () {
            alert("Ссылка скопирована в буфер обмена: " + currentURL);
        }, function (err) {
            console.error("Не удалось скопировать ссылку: ", err);
        });
    });
});
