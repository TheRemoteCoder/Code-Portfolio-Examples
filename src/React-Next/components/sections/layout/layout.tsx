import CookieBanner from "@components/atoms/cookie-banner"
import ContainerPage from "@components/atoms/container-page"
import Header from "@components/sections/header"
import ChildrenType from "@type/children"

interface LayoutType {
  children: ChildrenType
}

const Layout = (props: LayoutType) => {
  const { children } = props

  return (
    <>
      {/* * /}
      <ContainerPage hasCustomRows className="my-3">
        <Header />
      </ContainerPage>
      {/* */}
      <main role="main">{children}</main>
      <CookieBanner />
    </>
  )
}

export default Layout
