import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  })
  const {username, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, IsSuccess, message} = useSelector( (state) => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    } if(IsSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, IsSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        username,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner/>
  }

  return <>
    <section className="heading">
      <h1>
        <FaUser/> Register
      </h1>
      <p>
        Create an account and start bleeting
      </p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            placeholder="Create a username"
            onChange={onChange}/>
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}/>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Create a password"
            onChange={onChange}/>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm your password"
            onChange={onChange}/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">Register</button>
        </div>
      </form>
    </section>
  </>
}

export default Register