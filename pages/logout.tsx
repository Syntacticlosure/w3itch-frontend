import { AuthenticationContext } from 'components/pages'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'

import { logout } from '../api/account'

const Logout: NextPage = () => {
  const router = useRouter()
  const { dispatch } = useContext(AuthenticationContext)
  const startLogout = useCallback(async () => {
    await logout()
    dispatch({ type: 'LOGOUT' })
    await router.push('/games')
  }, [dispatch, router])

  useEffect(() => {
    startLogout()
  }, [startLogout])

  return (
    <Head>
      <title>Register account - w3itch.io</title>
    </Head>
  )
}

export default Logout
