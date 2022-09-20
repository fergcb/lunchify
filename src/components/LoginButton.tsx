import { ReactElement } from 'react'
import requestAuth from '../api/requestAuth'
import Button from './Button'

export default function LoginButton (): ReactElement {
  return <Button bgColor='bg-purple-500' onClick={requestAuth}>Login</Button>
}
