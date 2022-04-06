import '../styles/globals.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import { Layout } from 'components/layout'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { Fragment } from 'react'
import { NextPageWithLayout } from 'types'
import { UseWalletProvider } from 'use-wallet'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <SnackbarProvider maxSnack={3}>
        <Layout>{page}</Layout>
      </SnackbarProvider>
    ))
  return (
    <UseWalletProvider
      connectors={{
        injected: {
          chainId: [1, 4, 56, 97],
        },
        walletconnect: {
          rpc: {
            1: 'https://mainnet.infura.io/v3/a0d8c94ba9a946daa5ee149e52fa5ff1',
            4: 'https://rinkeby.infura.io/v3/a0d8c94ba9a946daa5ee149e52fa5ff1',
          },
          bridge: 'https://bridge.walletconnect.org',
          pollingInterval: 12000,
        },
      }}
    >
      <Fragment>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </Fragment>
    </UseWalletProvider>
  )
}

export default MyApp
