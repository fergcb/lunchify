import { ReactElement } from 'react'
import getAccessToken from './api/getAccessToken'
import Header from './components/Header'
import GamePage from './pages/GamePage'
import LandingPage from './pages/LandingPage'

function App (): ReactElement {
  const accessToken = getAccessToken()
  const loggedIn = accessToken !== null

  return <div className='flex h-screen flex-col'>
  <Header loggedIn={loggedIn} />
    { loggedIn
      ? <GamePage accessToken={accessToken} />
      : <LandingPage />
    }
  </div>
}

export default App
