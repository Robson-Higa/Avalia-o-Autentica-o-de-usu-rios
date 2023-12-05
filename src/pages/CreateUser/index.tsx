import { useState } from 'react'
import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'

import styles from '../../globals.module.css'
import { auth } from '../../config/firebase'


const CreateUser = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showSuccessMessage, shouldShowSuccessMessage] = useState(false)
  const [showErrorMessage, shouldShowErrorMessage] = useState(false)
  const [message, setMessage] = useState('')

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    shouldShowErrorMessage(false)
    shouldShowSuccessMessage(false)

    if (password === passwordConfirm) {
      if (password.length > 5) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential: UserCredential) => {
            console.log(userCredential)
            shouldShowSuccessMessage(true)
            setEmail('')
            setPassword('')
            setPasswordConfirm('')
          })
          .catch((error: any) => {
            console.log(error)
            shouldShowErrorMessage(true)
            const { code } = error
            if (code === 'auth/email-already-in-use') {
              setMessage('O e-mail informado já está em uso')
            } else {
              setMessage('Ocorreu um erro ao tentar criar o usuário')
            }
          })
      } else {
        shouldShowErrorMessage(true)
        setMessage('A senha deve conter no mínimo 6 caracteres')
      }
    } else {
      shouldShowErrorMessage(true)
      setMessage('As senhas são diferentes')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginArea}>
        <form className={styles.loginForm} onSubmit={(e) => handleForm(e)}>
          <input
            type="email"
            required
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <input
            type="password"
            required
            placeholder='Digite a senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <input
            type="password"
            required
            placeholder='Confirme a senha'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)} />

          <input type="submit" value="Cadastrar" />
        </form>
      </div>

      <div className={styles.messagesArea}>
        {showSuccessMessage && (
          <h3 className={styles.successCard}>
            Usuário cadastrado! Clique <Link to='/'>aqui</Link>
            &nbsp;para realizar o login.
          </h3>
        )}

        {showErrorMessage && (
          <h3 className={styles.errorCard}>{message}</h3>
        )}
      </div>

      <Link to='/' className={styles.button}>Voltar</Link>
    </div>
  )
}

export default CreateUser