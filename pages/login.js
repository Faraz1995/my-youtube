import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { magic } from '../lib/magic-client'

import styles from '../styles/login.module.css'
function Login() {
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const handleOnChangeEmail = (e) => {
    const { value } = e.target
    setEmail(value)
    setErrorMsg('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('login')
    if (email) {
      if (email === 'faraz.mehr7195@gmail.com') {
        console.log('route to dashboard')
        try {
          setLoading(true)
          const didToken = await magic.auth.loginWithMagicLink({
            email: email
          })
          if (didToken) {
            setLoading(false)
            router.push('/')
          }
        } catch (error) {
          // Handle errors if required!
          setLoading(false)
          console.log('sth went wrong didToken', error)
        }
        // router.push('/')
      } else {
        setLoading(false)
        setErrorMsg('sth went wrong login')
      }
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
            <div className={styles.logo}>logo </div>
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
