/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/api/hello', async ({ request }) => {
  const { visitor_name } = request.qs()
  const resLocation = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_ywehIVtFVxwkmx0ZH6Dtqi2bx9lU1&ipAddress=${request.ip()}`
  )
  const place = await resLocation.json()

  const weatherKey = process.env.WEATHER_KEY
  const resWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${Math.round((place.location.lat * 100) / 100).toFixed(2)}&lon=${Math.round((place.location.lng * 100) / 100).toFixed(2)}&units=metric&APPID=${weatherKey}`
  )
  const weatherData = await resWeather.json()
  const celcius = ((weatherData.main.temp - 32) * 5) / 9
  return {
    client_ip: request.ip(), // The IP address of the requester
    location: place.location.city, // The city of the requester
    greeting: `Hello ${visitor_name ?? ''}!, the temperature is ${weatherData.main.temp} degrees Celcius in ${place.location.city}`,
  }
})
