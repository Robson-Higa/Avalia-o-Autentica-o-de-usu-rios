import { signOut } from 'firebase/auth'
import { useContext, useEffect } from 'react'

import { auth } from '../../config/firebase'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import bye from '../../assets/img/bye.gif'

const Logout = () => {
  const { setExp } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    signOut(auth)
      .then(() => {
        setExp(0)
        navigate('/')
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className={styles.container}>
      <img src={bye} alt="Tchau tchau!" />
    </div>
  )
}

export default Logout