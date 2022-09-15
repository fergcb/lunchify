import React from 'react'

interface InputProps {
  type: string
}

const Input: React.FunctionComponent<InputProps> = ({ type = "text" }: InputProps) => {
  return (
    <input className="block font-medium w-full rounded-full border-2 border-zinc-900 pl-7 pr-12 py-2 px-8 sm:text-sm" type={ type } placeholder="Enter song or artist name" />
  )
}

export default Input
