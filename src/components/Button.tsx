import React from 'react'

interface ButtonProps {
  text: string
  bgColor: string
}

const Button: React.FunctionComponent<ButtonProps> = ({ text = 'Button text', bgColor = 'bg-green-500' }: ButtonProps) => {
  return (
    <button className={`hover:scale-105 text-white font-medium my-4 py-2 px-8 rounded-full ${bgColor}`}>{ text }</button>
  )
}

export default Button
