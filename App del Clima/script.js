// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.getElementById('weather-form'); // Selecciona el formulario del clima
    const cityInput = document.getElementById('city-input'); // Selecciona el campo de entrada de la ciudad
    const cityName = document.getElementById('city-name'); // Selecciona el elemento para el nombre de la ciudad
    const temperature = document.getElementById('temperature'); // Selecciona el elemento para la temperatura
    const description = document.getElementById('description'); // Selecciona el elemento para la descripción del clima

    // Añade un evento de envío al formulario
    weatherForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

        // Obtiene el valor del campo de entrada
        const city = cityInput.value.trim();

        // Si el campo de entrada no está vacío, busca el clima de la ciudad
        if (city !== '') {
            fetchWeather(city);
            cityInput.value = ''; // Limpia el campo de entrada
        }
    });

    // Función para buscar el clima de una ciudad
    function fetchWeather(city) {
        const apiKey = '7b6ac094be734700c5030c6f3ba950d1'; // Tu propia clave de API de OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Muestra los datos del clima
                cityName.textContent = data.name;
                temperature.textContent = `Temperatura: ${data.main.temp}°C`;
                description.textContent = `Descripción: ${data.weather[0].description}`;
            })
            .catch(error => {
                // Maneja cualquier error
                cityName.textContent = 'Ciudad no encontrada';
                temperature.textContent = '';
                description.textContent = '';
                console.error('Error al obtener el clima:', error);
            });
    }
});
