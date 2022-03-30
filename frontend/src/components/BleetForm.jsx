import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createBleet} from '../features/bleets/bleetSlice'

function BleetForm() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const onSubmit = e => {
    e.preventDefault()
    dispatch(createBleet({text}))
    setText('')
  }
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <textarea
          type="text"
          name="text"
          id="text"
          value= {text}
          placeholder="What's up?"
          maxLength="160"
          height = ""
          onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block"
          type='submit'>
            Send bleet
          </button>
        </div>
      </form>
    </section>
  )
}

export default BleetForm