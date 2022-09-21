import { ReactElement } from 'react'
import { api } from './api'
import Header from './components/Header'
import GamePage from './pages/GamePage'
import LandingPage from './pages/LandingPage'

function App (): ReactElement {
  return <div className='flex h-screen flex-col'>
    <Header />
    { api.auth.ready
      ? <GamePage />
      : <LandingPage />
    }
  </div>
}

export default App
