import { ReactElement } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import Link from './components/Link'

function App (): ReactElement {
  return <>
    <h1 className="text-4xl font-bold">Lunchify</h1>
    <Input text='Enter a song name' type='text' />
    <Button text='Play' bgColor="bg-green-500" />
    <Link text="Link" link="https://www.google.com" />
  </>
}

export default App
