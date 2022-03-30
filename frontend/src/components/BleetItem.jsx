import {FaUser} from 'react-icons/fa'

function BleetItem({bleet}) {
  return (
    <div className="bleet">
      <div className="bleetHeader">
        {/* Have to create the bleetHeader class after */}
        <h3><FaUser/>{bleet.username}</h3>
      </div>
      <h2>
        {bleet.text}
      </h2>
      <div>
        {new Date(bleet.createdAt).toLocaleString('es-ES')}
      </div>
    </div>
  )
}

export default BleetItem