import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { magic } from '../lib/magic-client'

import styles from '../styles/login.module.css'
function Login() {
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleRouteComplete = () => {
      setLoading(false)
    }
    router.events.on('routeChangeComplete', handleRouteComplete)
    router.events.on('routeChangeError', handleRouteComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete)
      router.events.off('routeChangeError', handleRouteComplete)
    }
  }, [router])
  const handleOnChangeEmail = (e) => {
    const { value } = e.target
    setEmail(value)
    setErrorMsg('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email) {
      try {
        setLoading(true)
        const didToken = await magic.auth.loginWithMagicLink({
          email: email
        })
        if (didToken) {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${didToken}`,
              'Content-Type': 'application/json'
            }
          })

          const loginResponse = await response.json()
          if (loginResponse.done) {
            router.push('/')
          } else {
            setLoading(false)
            console.log('sth went wrong on email')
          }
        }
      } catch (error) {
        // Handle errors if required!
        setLoading(false)
        console.log('sth went wrong didToken', error)
      }
      // router.push('/')
    } else {
      setLoading(false)
      setErrorMsg('enter a valid email address')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>signIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink}>
            <div className={styles.logo}>
              <Image
                src='/static/logo.png'
                alt='my youtube logo'
                width='130px'
                height='30px'
              />
            </div>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>SignIn</h1>
          <input
            type='text'
            placeholder='Email Address'
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.errorMsg}>{errorMsg}</p>
          <button className={styles.loginBtn} onClick={handleLogin}>
            {loading ? 'loading....' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login
