// Example: https://s3-us-west-2.amazonaws.com/s.cdpn.io/266205/San_Francisco.json

// Mock: https://www.dropbox.com/s/1t21mnbkudc7mzh/Weather-mock-2.png?dl=0

var basePath = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/266205/';
var cities = [
  'San_Francisco',
  'Miami',
  'New_Orleans',
  'Chicago',
  'New_York_City',
];
const DOM = {
  $weatherCardsList: $('.js-weather-cards'),
  $weatherCardTemplate: $('.js-card-template'),
};

// Convert from Meters Per Second to Miles Per Hour
function fromMPStoMPH(mps) {
  return Math.round(10 * mps * 2.2369362920544) / 10;
}

// Convert from Kelvins to Fahrenheit
function convertKtoF(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8);
}

// Weather icon
function getIconURL(icon) {
  return 'http://openweathermap.org/img/w/' + icon + '.png';
}

function fetchCountryWeather(cities) {
  Promise.all(
    cities
      .map((city) => {
        return `${basePath}${city}.json`;
      })
      .map((weatherUrl, index) =>
        fetch(weatherUrl)
          .then((response) => response.json())
          .catch((err) => null),
      ),
  ).then((weatherData) => {
    weatherData.forEach((data, index) => {
      if (data) {
        renderCard(data);
      } else {
        renderCard(
          {
            name: cities[index],
          },
          true,
        );
      }
    });
  });
}

function renderCard(countryWeatherData, hasError) {
  const $card = $(DOM.$weatherCardTemplate.html());
  $card.find('.js-card-country').text(countryWeatherData.name);
  if (!hasError) {
    $card
      .find('.js-card-temperature')
      .html(convertKtoF(countryWeatherData.main.temp) + '&deg;');
    $card
      .find('.js-card-image')
      .attr('src', getIconURL(countryWeatherData.weather[0].icon));
    $card.find('.js-card-weather').text(countryWeatherData.weather[0].main);
    $card
      .find('.js-card-wind-speed')
      .text(fromMPStoMPH(countryWeatherData.wind.speed) + ' mph');
  } else {
    $card.find('.js-card-body').text('Unable to fetch data.');
  }
  DOM.$weatherCardsList.append($card);
}

fetchCountryWeather(cities);
