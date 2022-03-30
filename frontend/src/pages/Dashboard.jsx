import {useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import BleetForm from '../components/BleetForm'
import Spinner from '../components/Spinner'
import { getAllBleets, reset } from '../features/bleets/bleetSlice'
import BleetItem from '../components/BleetItem'


function Dashboard() {
  // const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {bleets, isLoading, isError, message} = useSelector((state) => 
    state.bleets)
  
  useEffect(() => {
    if(isError) {
      console.log(message);
    }
    dispatch(getAllBleets())
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  if(isLoading) {
    return <Spinner/>
  }

  return <>
    <section className="heading">
      <h1>Welcome {user ? user.name : ''}</h1>
      <p>Latest bleets</p>
    </section>
    {user ? <BleetForm/> : ''}

    <section className="content">
      {bleets.length > 0 ? (
        <div className="bleets">
          {bleets.slice(0).reverse().map((bleet) => (
            <BleetItem key={bleet._id} bleet={bleet} />
          ))}
        </div>
      ) : (<h3>It's a little bit empty around here</h3>)}
    </section>

  </>
}

export default Dashboard