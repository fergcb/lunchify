import { ReactElement } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import Link from './components/Link'

function App (): ReactElement {
  return <>
    <h1 className='text-4xl font-bold'>Lunchify</h1>
    <Input text='Enter a song name' type='text' />
    <Button bgColor='bg-green-500'>Buton text</Button>
    <Link link='https://www.google.com'>Link</Link>
  </>
}

export default App
