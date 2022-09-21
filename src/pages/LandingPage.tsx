import { ReactElement } from 'react'
import LoginButton from '../components/LoginButton'

export default function LandingPage (): ReactElement {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <h1 className='text-xl font-bold'>Lunchify</h1>
      <p className='w-1/3 py-4 text-center'>Welcome to Lunchify! The best song guessing game on the internet.</p>
      <LoginButton />
    </div>
  )
}
