import { ReactElement } from 'react'
import getAccessToken from './api/getAccessToken'
import LoginButton from './components/LoginButton'

function App (): ReactElement {
  const accessToken = getAccessToken()
  const loggedIn = accessToken !== null

  return <>
    <h1 className="text-4xl font-bold">Lunchify</h1>
    { loggedIn
      ? <p>{ accessToken }</p>
      : <LoginButton />
    }
  </>
}

export default App
