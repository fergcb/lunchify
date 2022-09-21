import { ReactElement } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import PlaybackControls from '../components/PlaybackControls'

export default function GamePage (): ReactElement {
  return (
    <div className='flex h-full w-full flex-col'>
        <div id='search-form' className='flex h-full flex-col items-center justify-center'>
          <h1 className='text-xl font-bold text-purple-100'>Lunchify</h1>
          <Input type='text' text='Enter song/artist name' />
          <Button bgColor='bg-purple-500'>Submit</Button>
        </div>
        <PlaybackControls />
    </div>
  )
}
