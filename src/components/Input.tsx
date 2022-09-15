import React from 'react'

interface InputProps {
  type: string
  text: string
}

const Input: React.FunctionComponent<InputProps> = ({ text = 'Input text', type = 'text' }: InputProps) => {
  return (
    <input className='block w-full rounded-full border-2 border-zinc-900 py-2 px-8 pl-7 pr-12 font-medium sm:text-sm' type = { type } placeholder = {`${text}`} />
  )
}

export default Input
