import { useContext, useState } from 'react'
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import { UserContext } from '../../context/UserContext'
import { auth } from '../../config/firebase'
import globalStyles from '../../globals.module.css'
import styles from './styles.module.css'
import google from '../../assets/img/google.png'
import github from '../../assets/img/git.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMessage, shouldShowErrorMessage] = useState(false)

  const { setExp, setAuthTime, isSessionValid } = useContext(UserContext)

  const navigate = useNavigate()

  // FALHA CATASTRÓFICA DE SEGURANÇA!!!
  if (isSessionValid()) {
    navigate('/home')
  }

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    shouldShowErrorMessage(false)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, email, password
      )

      const { user } = userCredential
      const token = await user.getIdToken()
      const decodedToken = jwtDecode(token)
      const { exp } = decodedToken
      setExp(exp || 0)
      setAuthTime(0)
      navigate('/home')
    } catch (err: any) {
      // auth/wrong-password
      // auth/user-not-found
      // const { code } = err
      console.log(err)
      shouldShowErrorMessage(true)
      setEmail('')
      setPassword('')
    }
  }

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const { email, photoURL, displayName } = user
      console.log(email, photoURL, displayName)

      const token = await auth.currentUser?.getIdToken()
      console.log(token)
      if (token) {
        const decodedToken = jwtDecode(token)
        const { exp } = decodedToken
        setExp(exp || 0)
        navigate('/home')
      }
    } catch (err) {
      console.log(err)
    }
  }


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const { email, photoURL, displayName } = user
      console.log(email, photoURL, displayName)

      // const userCredential =
      //   GoogleAuthProvider.credentialFromResult(result)
      const token = await auth.currentUser?.getIdToken()
      console.log(token)
      if (token) {
        const decodedToken = jwtDecode(token)
        const { exp } = decodedToken
        setExp(exp || 0)
        navigate('/home')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const { email, photoURL, displayName } = user
      console.log(email, photoURL, displayName)

      const token = await auth.currentUser?.getIdToken()
      console.log(token)
      if (token) {
        const decodedToken = jwtDecode(token)
        const { exp } = decodedToken
        setExp(exp || 0)
        navigate('/home')
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.loginArea}>
        <form className={globalStyles.loginForm} onSubmit={(e) => signIn(e)}>
          <input
            type="email"
            value={email}
            placeholder='E-mail'
            required
            onChange={(e) => setEmail(e.target.value)} />

          <input
            type="password"
            value={password}
            placeholder='Senha'
            required
            onChange={(e) => setPassword(e.target.value)} />

          <input type="submit" value="Entrar" />
        </form>

        <p className={styles.redirect}>
          Não tem conta ainda? Clique&nbsp;
          <Link to='/create-user'>aqui</Link> para criar.
        </p>
      </div>

      <div className={globalStyles.messagesArea}>
        {showErrorMessage && (
          <h3 className={globalStyles.errorCard}>Credenciais inválidas</h3>
        )}
      </div>

      <button
        className={styles.googleCard}
        onClick={() => signInWithFacebook()}>
        <img src={github} alt="GitHub" />
        <span>Entrar com Facebook</span>
      </button>

      <button
        className={styles.googleCard}
        onClick={() => signInWithGoogle()}>
        <img src={google} alt="Google" />
        <span>Entrar com Google</span>
      </button>

      <button
        className={styles.googleCard}
        onClick={() => signInWithGitHub()}>
        <img src={github} alt="GitHub" />
        <span>Entrar com GitHub</span>
      </button>
    </div>
  )
}

export default Login