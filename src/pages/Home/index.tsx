import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <h1>Seja bem vindo!</h1>
      <p>Clique <Link to='/logout'>aqui</Link> para sair</p>
    </>
  )
}

export default Home