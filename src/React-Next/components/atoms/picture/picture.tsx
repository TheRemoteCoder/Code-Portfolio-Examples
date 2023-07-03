import { HTMLAttributes } from "react"

// 'base' = Intended: jpg|png
interface SourcesType {
  avif?: string
  base: string
  webp?: string
}

interface PictureType extends HTMLAttributes<HTMLImageElement> {
  alt?: string
  classNameImg?: string // Intended: 'img-fluid'
  isLazy?: boolean
  sources: SourcesType
  title?: string
}

/**
 * @todo Optimize - Use native next.js 'Image' component (if it supports lazyload)?
 * @todo Optimize - Remove duplicate code of 'loading' (possible TS bug - Not recognizes type when passing dynamic props)
 */
const Picture = (props: PictureType) => {
  const { alt, className, classNameImg, isLazy, sources, title } = props

  return (
    <picture className={(className ?? "") + " d-inline-block"} title={title ?? ""}>
      {sources.avif && <source srcSet={sources.avif} type="image/avif" />}
      {sources.webp && <source srcSet={sources.webp} type="image/webp" />}
      {isLazy && <img alt={alt ?? ""} src={sources.base} className={classNameImg ?? ""} loading="lazy" />}
      {!isLazy && <img alt={alt ?? ""} src={sources.base} className={classNameImg ?? ""} />}
    </picture>
  )
}

export default Picture
