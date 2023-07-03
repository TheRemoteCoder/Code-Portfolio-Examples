import { Col, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import Picture from "@components/atoms/picture"
import images from "@config/urls/images"

const imgPathsLogo: any = images.global.logos.brand.small

const Header = () => {
  const { t } = useTranslation()

  return (
    <Row as="header">
      <Col>
        <Picture
          sources={{
            avif: imgPathsLogo.avif,
            webp: imgPathsLogo.webp,
            base: imgPathsLogo.png,
          }}
          alt={t("global.brandName")}
        />
      </Col>
    </Row>
  )
}

export default Header
