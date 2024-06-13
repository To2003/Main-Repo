document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    const apiKey = '7b6ac094be734700c5030c6f3ba950d1'; // Tu propia clave de API de OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`;


    // Realizar una solicitud fetch a la API de OpenWeatherMap
    fetch(url)
        .then(response => response.json()) // Convertir la respuesta en un objeto JSON
        .then(data => {
            // Si la respuesta es exitosa (código 200)
            if (data.cod === 200) {
                // Actualizar el contenido del clima actual
                document.getElementById('city-name').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp}°C`;
                document.getElementById('description').textContent = `Clima: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humedad: ${data.main.humidity}%`;
                document.getElementById('wind').textContent = `Velocidad del viento: ${data.wind.speed} m/s`;

                // Obtener y mostrar el icono del clima
                const iconCode = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                document.getElementById('weather-icon').src = iconUrl;

                // Mostrar la sección del clima actual
                document.getElementById('current-weather-display').classList.remove('hidden');

                // Añadir los datos al historial de búsquedas
                addToHistory(data);

            } else {
                // Manejo de errores cuando la ciudad no es encontrada
                document.getElementById('city-name').textContent = 'Ciudad no encontrada';
                document.getElementById('temperature').textContent = '';
                document.getElementById('description').textContent = '';
                document.getElementById('humidity').textContent = '';
                document.getElementById('wind').textContent = '';
                document.getElementById('weather-icon').src = '';

                document.getElementById('current-weather-display').classList.add('hidden');
            }
        })
        .catch(error => {
            // Manejo de errores en la solicitud fetch
            console.error('Error fetching the weather data:', error);
            document.getElementById('city-name').textContent = 'Error al obtener los datos del clima';
            document.getElementById('temperature').textContent = '';
            document.getElementById('description').textContent = '';
            document.getElementById('humidity').textContent = '';
            document.getElementById('wind').textContent = '';
            document.getElementById('weather-icon').src = '';

            document.getElementById('current-weather-display').classList.add('hidden');
        });
});

// Función para añadir los datos del clima al historial de búsquedas
function addToHistory(data) {
    const historyGrid = document.getElementById('history-grid'); // Obtener el contenedor del historial

    // Crear una nueva tarjeta de historial
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');

    // Crear y configurar los elementos de la tarjeta
    const cityName = document.createElement('h4');
    cityName.textContent = data.name;

    const icon = document.createElement('img');
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    icon.src = iconUrl;

    const temp = document.createElement('p');
    temp.textContent = `Temperatura: ${data.main.temp}°C`;

    const desc = document.createElement('p');
    desc.textContent = `Clima: ${data.weather[0].description}`;

    const humidity = document.createElement('p');
    humidity.textContent = `Humedad: ${data.main.humidity}%`;

    const wind = document.createElement('p');
    wind.textContent = `Velocidad del viento: ${data.wind.speed} m/s`;

    // Añadir los elementos a la tarjeta de historial
    historyItem.appendChild(cityName);
    historyItem.appendChild(icon);
    historyItem.appendChild(temp);
    historyItem.appendChild(desc);
    historyItem.appendChild(humidity);
    historyItem.appendChild(wind);

    // Añadir la tarjeta al contenedor del historial
    historyGrid.appendChild(historyItem);
}