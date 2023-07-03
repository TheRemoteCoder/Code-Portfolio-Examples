import { HTMLAttributes } from "react"
import Titles from "@components/atoms/titles"
import colors from "@config/styles/colors"

interface ArticleType extends HTMLAttributes<HTMLElement> {
  title: string // Custom title, not native HTML title
  titlePrefix: string
  text: string
}

/**
 * @todo Optimize - Type: Merge with 'Titles' interface?
 * @todo Optimize - Language simplification: Get key and fill title/text by convention?
 */
const Article = (props: ArticleType) => {
  const { className, text, title, titlePrefix } = props

  return (
    <div className={className ?? ""}>
      <Titles title={title} titlePrefix={titlePrefix} />
      <p className="">{text}</p>
    </div>
  )
}

export default Article
