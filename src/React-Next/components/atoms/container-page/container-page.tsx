import { HTMLAttributes } from "react"
import { Container, Col, Row } from "react-bootstrap"
import { useMediaQuery } from "react-responsive"
import mediaQueries from "@config/styles/media-queries"
import ChildrenType from "@type/children"
import StyledBackground, { getBackgroundCfg } from "./styles"

interface ContainerType extends HTMLAttributes<HTMLElement> {
  backgroundId?: number
  children?: ChildrenType
}

/**
 * Page-wide content container with options:
 * - Single row/col (else supply your own)
 * - Custom background by its internal ID
 */
const ContainerPage = (props: ContainerType) => {
  const { backgroundId, children, className, hasCustomRows } = props
  const isMobile = useMediaQuery({ query: `(max-width: ${mediaQueries.breakpoints.md}px)` })
  const backgroundCfg = getBackgroundCfg(isMobile, backgroundId)

  const containerClass = className && className.includes("container") ? "" : "container-xl"

  return (
    <StyledBackground backgroundCfg={backgroundCfg} className={(className ?? "") + ` ${containerClass} mb-3 gx-lg-1`}>
      <Container className="container-fluid">
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </StyledBackground>
  )
}

export default ContainerPage
