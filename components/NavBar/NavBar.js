import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { magic } from '../../lib/magic-client'
import styles from './navbar.module.css'

function NavBar() {
  const [showDropDown, setShowDropDown] = useState(false)
  const [username, setUsername] = useState('')
  const [didToken, setDidToken] = useState('')
  const router = useRouter()

  useEffect(() => {
    const getUserFromMagic = async () => {
      try {
        const { email, publicAddress } = await magic.user.getMetadata()
        const didTokenMagic = await magic.user.getIdToken()
        if (email) {
          setUsername(email)
          setDidToken(didTokenMagic)
        }
      } catch (error) {
        console.log('error on getting email', error)
        // Handle errors if required!
      }
    }

    getUserFromMagic()
  }, [])

  const goToHome = (e) => {
    e.preventDefault()
    router.push('/')
  }
  const goToMyList = (e) => {
    e.preventDefault()
    router.push('/my-list')
  }

  const handleDropDown = (e) => {
    e.preventDefault()
    setShowDropDown((prev) => !prev)
  }

  const handleSignout = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${didToken}`,
          'Content-Type': 'application/json'
        }
      })

      const res = await response.json()
    } catch (error) {
      console.error('Error logging out', error)
      router.push('/login')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href='/'>
          <a className={styles.logoLink}>
            <div className={styles.logo}>logo </div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={goToHome}>
            home
          </li>
          <li className={styles.navItem} onClick={goToMyList}>
            my list
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.userBtn} onClick={handleDropDown}>
              <p className={styles.username}>{username}</p>
              {/* expand more icon */}
              <Image
                src={'/static/expand.svg'}
                alt='expand'
                width={'24px'}
                height={'24px'}
              />
            </button>
            {showDropDown && (
              <div className={styles.dropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignout}>
                    sign out
                  </a>
                  <div className={styles.line}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar
