import React from 'react'

interface LinkProps {
  text: string
  link: string
}

const Link: React.FunctionComponent<LinkProps> = ({ text = 'Link text', link = '' }: LinkProps) => {
  return (
    <a className='font-medium hover:underline' href={ link } target="_blank" rel="noreferrer">{ text }</a>
  )
}

export default Link
