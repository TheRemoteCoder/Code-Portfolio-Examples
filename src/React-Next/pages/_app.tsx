import React from "react"
import { AppProps } from "next/app"
import { I18nextProvider } from "react-i18next"
import Layout from "@components/sections/layout"
import i18n from "@lang/i18n"
import ChildrenType from "@type/children"

import "../../assets/index.scss"

interface SafeHydrateType {
  children: ChildrenType
}

function SafeHydrate({ children }: SafeHydrateType) {
  return <div suppressHydrationWarning>{typeof window === "undefined" ? null : children}</div>
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeHydrate>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SafeHydrate>
    </I18nextProvider>
  )
}

export default App
