import styled from "styled-components"

const StyledImage = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
`

interface IconType {
  alt: string
  url: string
}

const Icon = (props: IconType) => {
  const { alt, url } = props

  return (
    <StyledImage>
      <img alt={alt} src={url} loading="lazy" />
    </StyledImage>
  )
}

export default Icon
