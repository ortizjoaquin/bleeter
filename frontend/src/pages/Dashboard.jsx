// import {useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import BleetForm from '../components/BleetForm'


function Dashboard() {
  const {user} = useSelector((state) => state.auth)
  return <>
    <section className="heading">
      <h1>Welcome {user ? user.name : ''}</h1>
      <p>Latest bleets</p>
    </section>
    <BleetForm>
      
    </BleetForm>
  </>
}

export default Dashboard