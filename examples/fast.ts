import DenoGrant from '../src/index.ts'
import Providers from '../src/interfaces/Providers.ts'

import fast from 'https://deno.land/x/fast@3.8.0/mod.ts'

const GH_ID = '' //>CHANGE_ME or Deno.env.get('GITHUB_CLIENT_ID')
const GH_SECRET = '' //>CHANGE_ME or Deno.env.get('GITHUB_CLIENT_SECRET')
const BASE_URL = 'http://localhost:8000'

const denoGrant = new DenoGrant({
  base_uri: BASE_URL,
  strategies: [
    {
      provider: Providers.github,
      client_id: GH_ID,
      client_secret: GH_SECRET,
      redirect_path: '/auth/github',
      scope: '',
    }
  ]
})

const app = fast()

app.get('/', (ctx) => {
  const uri = denoGrant.getAuthorizationUri(Providers.github)?.toString()
  if (uri) {
    return ctx.redirect(uri)
  }
  return { err: 'unkown_err' }
})

app.get('/u/:name', async (ctx) => {
  const { name } = ctx.params

  if (name) {
    const p = await fetch(`https://api.github.com/users/${name}`)
      .then(r => r.json())
    return p
  }
  return { err: 'no user' }
})

app.get('/auth/github', async (ctx) => {
  const code = ctx.query['code']
  let token = await denoGrant.getToken(
    Providers.github,
    `${BASE_URL}/auth/github?code=${code}&scope=`
  )

  if(token && 'accessToken' in token) {
    const profile = await denoGrant.getProfile(Providers.github, token.accessToken)
    return ctx.redirect(`/u/${profile.login}`)
  }

  return { err: 'some error' }

})

await app.serve()

