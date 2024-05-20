document.addEventListener("DOMContentLoaded", function () {
    const apiHost = "https://dishdash.ru"

    document.getElementById("lobbyBtn").addEventListener("click", () => {
        const locationData = {
            lat: 59.957441,
            lng: 30.308091
        };

        // Преобразуем объект в строку JSON
        const jsonData = JSON.stringify({
            location: JSON.stringify(locationData)
        });

        // Опции запроса
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        };

        // Выполняем запрос
        fetch(`${apiHost}/api/v1/lobby`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Парсим JSON ответ
            })
            .then(data => {
                console.log(data); // Выводим данные из ответа
                if (data.id) {
                    const url = `/swipe/${data.id}`; // Формируем URL
                    console.log(url, window.location.href)
                    window.location.href = url; // Переходим на URL
                } else {
                    console.error('Response did not contain an "id" field');
                }
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    });
});
