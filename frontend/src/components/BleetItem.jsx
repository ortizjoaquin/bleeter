import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {deleteBleet} from '../features/bleets/bleetSlice'

function BleetItem({bleet}) {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  return (
    <div className="bleet">
      <div className="bleetHeader">
        {/* Have to create the bleetHeader class after */}
        <h3><FaUser/>{bleet.username}</h3>
      </div>
      <h2>
        {bleet.text}
      </h2>
      {user ? (<button onClick={() => dispatch(deleteBleet(bleet._id))}
      className="close">X</button>) : ''}
      <div>
        {new Date(bleet.createdAt).toLocaleString('es-ES')}
      </div>
    </div>
  )
}

export default BleetItem