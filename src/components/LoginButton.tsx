import { ReactElement } from 'react'
import { api } from '../api'
import Button from './Button'

export default function LoginButton (): ReactElement {
  return <Button bgColor='bg-purple-500' onClick={() => api.auth.login()}>Login</Button>
}
