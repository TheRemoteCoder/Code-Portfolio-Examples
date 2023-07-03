import { useTranslation } from "react-i18next"
import colors from "@config/styles/colors"
import images from "@config/urls/images"
import { default as urls } from "@config/urls/global"

const imgPaths: any = images.components.metaTags

/**
 * @todo Optimization - Does this need to be an 'atom'?
 */
const MetaTags = () => {
  const { t } = useTranslation()

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="color-scheme" content="dark" />
      <meta name="theme-color" content={colors.theme.meta} />
      <meta name="msapplication-TileColor" content={colors.theme.meta} />
      <meta property="og:title" content={t("metaOgTitle")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={urls.meta.ogUrl} />
      <meta property="og:image" content={imgPaths.ogImage} />
      <link rel="apple-touch-icon" href={imgPaths.appleTouchIcon} />
      <link rel="manifest" href="site.webmanifest" />
    </>
  )
}

export default MetaTags
