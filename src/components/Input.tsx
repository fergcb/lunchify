import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string
  text: string
}

const Input: React.FunctionComponent<InputProps> = ({ text = 'Input text', type = 'text', ...props }: InputProps) => {
  return (
    <input {...props} className='block font-medium w-full rounded-full border-2 border-zinc-900 pl-7 pr-12 py-2 px-8 sm:text-sm' type = { type } placeholder = {`${text}`} />
  )
}

export default Input
