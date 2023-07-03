import { Stack } from "react-bootstrap"
import social from "@config/urls/social"
import LinkSocial from "../link-social"

const ListSocialLinks = () => {
  return (
    <Stack direction="horizontal" gap={3}>
      {social.map((item, index) => (
        <LinkSocial key={index} icon={item.icon} name={item.name} url={item.url} />
      ))}
    </Stack>
  )
}

export default ListSocialLinks
