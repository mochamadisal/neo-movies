import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/general.scss'
import styled from 'styled-components'
import { Layout, Menu, Switch } from 'antd';

const { Header, Footer } = Layout;

const StyledLogo = styled.div`
  float: left;
  margin-right: 50px;
  display: flex;
`

const StyledTitleLogo = styled.h2`
  color: #ffffff;
  margin-bottom: 0px;
  font-size: 18px;
`

const StyledSwitch = styled.div`
  float: right;
  display: flex;
  position: relative;
  align-items: center;
  height: 100%;
`

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [showChild, setShowChild] = useState(false);
  
  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);
  
  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }

  const changeLanguage = (event: boolean) => {
    if (event) {
      router.push(router.asPath, router.asPath, { locale: 'en-US' })
    } else {
      router.push(router.asPath, router.asPath, { locale: 'id' })
    }
  }


  return (
    <>
      <Head>
        <title>Neo Movies</title>
        <meta name="author" content="Neo Movies" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="text/html; charset=UTF-8" />
        <meta name="keywords" content="neobank, mobile banking dari BNC untuk semua kebutuhan perbankan" />
        <meta name="description" content="neobank, mobile banking dari BNC untuk semua kebutuhan perbankan" />
        {/* Open Graph */}
        <meta property="og:url" content="https://www.bankneocommerce.co.id/" key="ogurl" />
        <meta property="og:image" content="https://www.bankneocommerce.co.id/_next/static/images/bnc_logo_b-54a1193924403646c7da1295d3b7512a.png" key="ogimage" />
        <meta property="og:site_name" content="Neo Movies" key="ogsitename" />
        <meta property="og:title" content="Neo Movies" key="ogtitle" />
        <meta property="og:description" content="neobank, mobile banking dari BNC untuk semua kebutuhan perbankan" key="ogdesc" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content="Neo Movies" />
        <meta name="twitter:image" content="https://www.bankneocommerce.co.id/_next/static/images/bnc_logo_b-54a1193924403646c7da1295d3b7512a.png" />
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta name="twitter:description" content="neobank, mobile banking dari BNC untuk semua kebutuhan perbankan" />
        <meta name="twitter:creator" content="Neo Movies" key="twhandle" />
        <meta property="twitter:url" content="https://www.bankneocommerce.co.id/" />
      </Head>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          {/* <StyledLogo>
            <StyledTitleLogo>
              NEO MOVIES
            </StyledTitleLogo>
          </StyledLogo> */}
          <StyledSwitch>
            <Switch checkedChildren="EN" unCheckedChildren="ID" defaultChecked onClick={(e) => { changeLanguage(e) }} />
          </StyledSwitch>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item onClick={() => router.push('/')} className={router.pathname == '/' ? 'ant-menu-item-selected':'ant-menu-item-unselected'} key="1">List Content</Menu.Item>
            <Menu.Item onClick={() => router.push('/favourite')} className={router.pathname == '/favourite' ? 'ant-menu-item-selected':'ant-menu-item-unselected'} key="2">My Favourite</Menu.Item>
          </Menu>
        </Header>
        <Component {...pageProps} />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  )
}

export default MyApp

