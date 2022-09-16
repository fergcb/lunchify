import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: string
}

const Button: React.FunctionComponent<ButtonProps> = ({ bgColor = 'bg-purple-500', children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`my-4 rounded-full py-2 px-8 font-medium text-white hover:scale-105 ${bgColor}`}>{ children }</button>
  )
}

export default Button
