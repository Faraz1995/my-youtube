import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading/Loading'

import { magic } from '../lib/magic-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn()
      if (isLoggedIn) {
        // route to /
        router.push('/')
      } else {
        // route to /login
        router.push('/login')
      }
    }
    handleLoggedIn()
  }, [])

  useEffect(() => {
    const handleComplete = () => {
      setLoading(false)
    }
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return loading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp
