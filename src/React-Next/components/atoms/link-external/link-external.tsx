import { LinkHTMLAttributes } from "react"
import ChildrenType from "@type/children"

interface LinkType extends LinkHTMLAttributes<HTMLAnchorElement> {
  children: ChildrenType
}

export default function LinkExternal({ children, href, ...props }: LinkType) {
  return (
    <>
      {href && (
        <a href={href} target="_blank" rel="nofollow noopener noreferrer" className="" {...props}>
          {children}
        </a>
      )}
    </>
  )
}
