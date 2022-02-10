import React, { useState } from 'react'
import './Comments.scss'
import { db } from '../../firebase'
import { useAuth } from '../../AuthContext/AuthContext'

const Comments = (props) => {
  const {comment } = useAuth()
  const {productID} = props
  const [cmt, setCmt] = useState('')
  const handleSend =() => {
    comment(cmt,productID)
  }



  return (
    <div className='cmt-container'>
      <div >
        <div className='cmt-content-parent'>
          <div className='img-user'>
            <img src="https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg" alt="" />
          </div>
          <div className='willCmt'>
            <div className='comment-content'>
              <textarea placeholder='Cmt smt....' value={cmt} onChange={(e) => setCmt(e.target.value)}></textarea>
              <button disabled={!cmt} onClick={handleSend} className='btn btn-primary'>Send</button>
            </div>
          </div>
        </div>
      </div>
      <div className='totalCmt'>
        <div className='img-user'>
          <img src="https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg" alt="" />
        </div>
        <div className='cmt-user-container'>
          <div className='cmt-user'>
            <p>aaaaaaaaaa</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Comments