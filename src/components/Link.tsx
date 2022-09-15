import React, { AnchorHTMLAttributes } from 'react'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  link: string
  external?: boolean
}

const Link: React.FunctionComponent<LinkProps> = ({ link = '', external = false, children, ...props }: LinkProps) => {
  return (
    <a {...props} className='font-medium hover:underline' href={ link } target={external ? '_blank' : ''} rel='noreferrer'>{ children }</a>
  )
}

export default Link
