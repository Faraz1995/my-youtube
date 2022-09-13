import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from './navbar.module.css'

function NavBar({ username }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const router = useRouter()

  const goToHome = (e) => {
    e.preventDefault()
    router.push('/')
  }
  const goToMyList = (e) => {
    e.preventDefault()
    router.push('/browse/my-list')
  }

  const handleDropDown = (e) => {
    e.preventDefault()
    setShowDropDown((prev) => !prev)
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
                  <Link href='/login'>
                    <a className={styles.linkName}>sign out</a>
                  </Link>
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
