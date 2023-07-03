import CookieConsent from "react-cookie-consent"
import { useTranslation } from "react-i18next"
import colors from "@config/styles/colors"
import type from "@config/styles/type"

const buttonStyleCfg = { 
  backgroundColor: "transparent", 
  color: colors.text.light, 
  fontSize: type.fontSizeBase 
}

const CookieBanner = () => {
  const { t } = useTranslation()

  return (
    <CookieConsent
      location="bottom"
      buttonText={t("components.cookieBanner.cta")}
      cookieName="cookieConsent"
      expires={150}
      style={{ zIndex: 9999 }}
      buttonStyle={buttonStyleCfg}
    >
      {t("components.cookieBanner.text")}
    </CookieConsent>
  )
}

export default CookieBanner
