import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: string
}

const Button: React.FunctionComponent<ButtonProps> = ({ bgColor = 'bg-green-500', children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`hover:scale-105 text-white font-medium my-4 py-2 px-8 rounded-full ${bgColor}`}>{ children }</button>
  )
}

export default Button
