import { Col, Row } from "react-bootstrap"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import NavList from "@components/atoms/nav-list"
import ListSocialLinks from "@components/molecules/list-social-links"

const StyledFooter = styled.div`
`

const Footer = () => {
  const { t } = useTranslation()
  const navItems: any = t("components.footer.navItems", { returnObjects: true })

  return (
    <StyledFooter>
      <Row>
        <Col md={3} className="mb-5">
          <h2 className="">{t("components.footer.texts.title")}</h2>
          <p className="mb-3">{t("components.footer.texts.text")}</p>
          <ListSocialLinks />
        </Col>
        {navItems.map((item, index) => (
          <Col key={index} md={2} lg={{ span: 2, offset: index === 0 ? 1 : 0 }}>
            <NavList items={item.childItems} title={item.title} />
          </Col>
        ))}
      </Row>
    </StyledFooter>
  )
}

export default Footer
