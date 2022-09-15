import React from 'react'

interface LinkProps {
  text: string
  link: string
}

const Link: React.FunctionComponent<LinkProps> = ({ text = 'Link text', link = '' }: LinkProps) => {
  return (
    <a className='hover:underline font-medium' href={ link } target="_blank">{ text }</a>
  )
}

export default Link
