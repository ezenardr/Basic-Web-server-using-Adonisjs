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
  return {
    client_ip: '127.0.0.1', // The IP address of the requester
    location: 'New York', // The city of the requester
    greeting: `Hello ${visitor_name ?? ''}!, the temperature is 11 degrees Celcius in New York`,
  }
})
