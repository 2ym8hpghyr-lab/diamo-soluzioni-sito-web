'use client'
import { useState, useEffect } from 'react'

interface Props {
  email: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function EmailLink({ email, children, className, style }: Props) {
  const [href, setHref] = useState<string | undefined>(undefined)
  useEffect(() => { setHref(`mailto:${email}`) }, [email])
  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  )
}
