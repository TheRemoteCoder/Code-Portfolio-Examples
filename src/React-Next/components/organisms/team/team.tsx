import { Container, Col, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import Article from "@components/molecules/article"
import TeamMember from "@components/molecules/team-member"

const Team = () => {
  const { t } = useTranslation()
  const listItems: any = t("components.team.listItems", { returnObjects: true })

  return (
    <Container as={"section"} className="mb-5">
      <Row className="mb-4">
        <Col lg={4}>
          <Article
            titlePrefix={t("components.team.texts.titlePrefix")}
            title={t("components.team.texts.title")}
            text={t("components.team.texts.text")}
          />
        </Col>
      </Row>
      <Row>
        {listItems.map((item, index) => (
          <Col key={index} xl={6} xxl={4}>
            <TeamMember index={index} name={item.name} text={item.text} profile={item.profile} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Team
