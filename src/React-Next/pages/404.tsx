import Head from "next/head"
import { useTranslation } from "react-i18next"

const Custom404 = () => {
  const { t } = useTranslation()

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{t("pages.error404.title")}</title>
      <meta name="description" content={t("pages.error404.description")} />
    </Head>
  )
}

export default Custom404
