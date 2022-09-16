import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string
  text: string
}

const Input: React.FunctionComponent<InputProps> = ({ text = 'Input text', type = 'text', ...props }: InputProps) => {
  return (
    <input {...props} className='m-4 block w-2/3 rounded-full border-2 border-black-900 py-2 px-8 pl-7 pr-12 text-sm font-medium text-black-900' type = { type } placeholder = {`${text}`} />
  )
}

export default Input
