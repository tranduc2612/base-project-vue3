import { createAuth0 } from '@auth0/auth0-vue'

export default createAuth0({
  domain: 'dev-saoey73oawm3uyg7.us.auth0.com',
  clientId: '9gXIOtI8dT61rdYs9RYXuVfJotehaik4',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'https://dev-saoey73oawm3uyg7.us.auth0.com/api/v2/',
  },
})
