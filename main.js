const apiUrl = 'https://api.weather.gov/points/40.679114812883235,-73.94419622729974';

async function fetchTemperature() {
  try {
    // Step 1: Fetch data from the API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const data = await response.json();

    // Step 2: Get forecast URL from the response
    const forecastUrl = data.properties.forecast;

    // Step 3: Fetch forecast data
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error(`Forecast call failed with status ${forecastResponse.status}`);
    }
    const forecastData = await forecastResponse.json();

    // Step 4: Extract temperature information
    const currentPeriod = forecastData.properties.periods[0];
    const temperature = `${currentPeriod.temperature}° ${currentPeriod.temperatureUnit}`;

    // Step 5: Display temperature on the webpage
    document.getElementById('temperature').textContent = temperature;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('temperature').textContent = 'Unable to fetch temperature.';
  }
}

// Call the function when the page loads
fetchTemperature();
