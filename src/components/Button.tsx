import React from 'react'

interface ButtonProps {
  text: string
  bgColor: string
}

const Button: React.FunctionComponent<ButtonProps> = ({ text = 'Button text', bgColor = 'bg-green-500' }: ButtonProps) => {
  return (
    <button className={`my-4 rounded-full py-2 px-8 font-medium text-white hover:scale-105 ${bgColor}`}>{ text }</button>
  )
}

export default Button
